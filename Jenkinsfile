pipeline{
    agent{
        docker{
            image 'node:lts-bullseye-slim'
            args '-p3000:3000'
        }
    }
    stages{
        stage('Build App'){
            steps{
                sh 'npm install'
            }
        }
    }
}