#!/bin/bash

# Create Cognito User Pool
aws cognito-idp create-user-pool \
  --pool-name "interview-prep-users" \
  --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=true,RequireLowercase=true,RequireNumbers=true,RequireSymbols=false}" \
  --auto-verified-attributes email \
  --username-attributes email \
  --region us-east-1

# Create User Pool Client
aws cognito-idp create-user-pool-client \
  --user-pool-id "us-east-1_XXXXXXXXX" \
  --client-name "interview-prep-client" \
  --explicit-auth-flows ADMIN_NO_SRP_AUTH USER_PASSWORD_AUTH \
  --region us-east-1

# Create DynamoDB Tables
aws dynamodb create-table \
  --table-name interview-prep-users \
  --attribute-definitions AttributeName=userId,AttributeType=S \
  --key-schema AttributeName=userId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1

aws dynamodb create-table \
  --table-name interview-prep-sessions \
  --attribute-definitions AttributeName=sessionId,AttributeType=S AttributeName=userId,AttributeType=S \
  --key-schema AttributeName=sessionId,KeyType=HASH \
  --global-secondary-indexes IndexName=UserIndex,KeySchema=[{AttributeName=userId,KeyType=HASH}],Projection={ProjectionType=ALL} \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1

# Create S3 Bucket
aws s3 mb s3://interview-prep-storage-$(date +%s) --region us-east-1

echo "AWS resources created successfully!"