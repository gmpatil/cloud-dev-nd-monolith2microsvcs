export const config = {
  "aws": {
    "aws_region": process.env.aws_region,
    "aws_profile": process.env.aws_profile,
    "aws_media_bucket": process.env.aws_s3_bucket,
    "url": process.env.URL
  },
  "rdbms": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
  },
  "jwt": {
    "secret": process.env.JWT_SECRET
  }

}
