#!/bin/bash

# Install AWS SDK packages
npm install @aws-sdk/client-cognito-identity-provider @aws-sdk/client-dynamodb @aws-sdk/util-dynamodb @aws-sdk/client-s3

# Install additional dependencies
npm install uuid @types/uuid

echo "Dependencies installed successfully!"
echo ""
echo "Next steps:"
echo "1. Run: aws configure (set your AWS credentials)"
echo "2. Run: ./setup-aws.sh (create AWS resources)"
echo "3. Update .env.local with the resource IDs"
echo "4. Run: npm run dev"