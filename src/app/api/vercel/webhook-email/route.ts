import DeploymentEmail from '@/emails/vercel-deploy'
import { octokit, resendClient } from '@/utils/clients'
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const clientEmail =
    request.nextUrl.searchParams.get('email') ||
    'adrian.alvarezalonso1991@gmail.com'
  const githubName = request.nextUrl.searchParams.get('githubName')
  const clientName = request.nextUrl.searchParams.get('clientName')
  const previewUrl = request.nextUrl.searchParams.get('previewUrl')

  // Fetch the last two commits from the main branch (or another branch)
  const { data: commitsData } = await octokit.rest.repos.listCommits({
    owner: 'n4n1t0',
    repo: githubName || 'nextjs-blog',
    per_page: 2 // We only need the last two commits to compare
  })

  const latestCommitSha = commitsData[0].sha
  const previousCommitSha = commitsData[1].sha

  // Get the commit comparison
  const { data: comparison } = await octokit.rest.repos.compareCommits({
    owner: 'n4n1t0',
    repo: githubName || 'nextjs-blog',
    base: previousCommitSha,
    head: latestCommitSha
  })

  // Map over the commits to get their messages
  const commitMessages = comparison.commits.map(
    (commit: { commit: { message: string } }) => commit.commit.message
  )

  // Send email using Resend
  const { data, error } = await resendClient.emails.send({
    from: 'info@adrian-alvarez.dev',
    to: [clientEmail, 'adrian.alvarezalonso1991@gmail.com'],
    subject: 'Nuevo Deploy',
    react: DeploymentEmail({
      clientName: clientName || 'Adrian',
      features: commitMessages,
      previewUrl: previewUrl || 'https://example.com'
    })
  })

  if (error) {
    return Response.json({ error })
  }

  return Response.json({ data })
}
