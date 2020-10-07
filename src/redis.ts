import { createClient } from 'redis'

const redis = createClient(process.env.REDIS_URL!)

export const get = (key: string) =>
	new Promise<string | null>((resolve, reject) =>
		redis.get(key, (error, value) => error ? reject(error) : resolve(value))
	)

export const set = (key: string, value: string) =>
	new Promise<void>((resolve, reject) =>
		redis.set(key, value, error => error ? reject(error) : resolve())
	)
