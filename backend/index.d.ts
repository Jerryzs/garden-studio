import { type User } from './src/routes/user.ts'

declare global {
  namespace Express {
    export interface Request {
      user?: User
    }
  }
}
