$body = @{
    email = "test$(Get-Random)@example.com"
    password = "Password123!"
    first_name = "Test"
    last_name = "User"
} | ConvertTo-Json

Write-Host "Request Body:"
Write-Host $body

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" `
        -Method Post `
        -ContentType "application/json" `
        -Headers @{"X-Forwarded-For" = "203.0.113.99"} `
        -Body $body
    Write-Host "STATUS: $($response.StatusCode)"
    Write-Host "RESPONSE: $($response.Content)"
} catch {
    Write-Host "ERROR:"
    Write-Host $_.Exception.Response.StatusCode
    Write-Host $_.Exception.Response.StatusDescription
    Write-Host $_.ErrorDetails.Message
}
