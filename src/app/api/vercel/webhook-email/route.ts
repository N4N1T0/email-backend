import DeploymentEmail from '@/emails/vercel-deploy'
import { octokit, resendClient } from '@/utils/clients'
import { NextRequest } from 'next/server'
import crypto from 'crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const payload = await request.text()

  // Generate the signature to verify the webhook request
  const signature = crypto
    .createHmac('sha1', process.env.WEBHOOK_SECRET!)
    .update(payload)
    .digest('hex')

  // Compare the signature with the one provided in the request headers
  const requestSignature = request.headers.get('x-vercel-signature')

  if (signature !== requestSignature) {
    return new Response('Invalid signature', { status: 401 })
  }

  // Extract query params or fallback to default values
  const clientEmail =
    request.nextUrl.searchParams.get('email') ||
    'adrian.alvarezalonso1991@gmail.com'
  const githubName =
    request.nextUrl.searchParams.get('githubName') || 'nextjs-blog'
  const clientName = request.nextUrl.searchParams.get('clientName') || 'Adrian'
  const previewUrl =
    request.nextUrl.searchParams.get('previewUrl') || 'https://example.com'

  // Fetch the last two commits from the GitHub repo
  const { data: commitsData } = await octokit.rest.repos.listCommits({
    owner: 'n4n1t0',
    repo: githubName,
    per_page: 2 // We only need the last two commits
  })

  if (commitsData.length < 2) {
    return new Response('Not enough commits to compare', { status: 400 })
  }

  const latestCommitSha = commitsData[0].sha
  const previousCommitSha = commitsData[1].sha

  // Compare commits to get commit messages between the last two
  const { data: comparison } = await octokit.rest.repos.compareCommits({
    owner: 'n4n1t0',
    repo: githubName,
    base: previousCommitSha,
    head: latestCommitSha
  })

  // Map over the commits to extract their messages
  const commitMessages = comparison.commits.map(
    (commit: { commit: { message: string } }) => commit.commit.message
  )

  // Send an email with the commit messages as features
  const { data, error } = await resendClient.emails.send({
    from: 'info@adrian-alvarez.dev',
    to: [clientEmail, 'adrian.alvarezalonso1991@gmail.com'],
    subject: 'Nuevo Deploy',
    react: DeploymentEmail({
      clientName,
      features: commitMessages,
      previewUrl
    })
  })

  if (error) {
    return Response.json({ error })
  }

  return Response.json({ data })
}
