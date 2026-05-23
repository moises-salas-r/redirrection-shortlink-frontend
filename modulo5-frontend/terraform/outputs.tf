output "s3_bucket_name" {
  description = "Nombre del bucket S3 del frontend"
  value       = aws_s3_bucket.frontend_bucket.id
}

output "s3_bucket_website_endpoint" {
  description = "Endpoint del website S3"
  value       = aws_s3_bucket.frontend_bucket.website_endpoint
}

output "cloudfront_distribution_id" {
  description = "ID de la distribución CloudFront"
  value       = aws_cloudfront_distribution.frontend_distribution.id
}

output "cloudfront_domain_name" {
  description = "Dominio de CloudFront (URL para acceder al frontend)"
  value       = aws_cloudfront_distribution.frontend_distribution.domain_name
}

output "frontend_url" {
  description = "URL completa del frontend (usar esta URL para acceder)"
  value       = "https://${aws_cloudfront_distribution.frontend_distribution.domain_name}"
}
