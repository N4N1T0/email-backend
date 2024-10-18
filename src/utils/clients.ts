import { Resend } from 'resend'
import { Octokit } from 'octokit'

export const resendClient = new Resend(process.env.RESEND_API_KEY)

export const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN
})
