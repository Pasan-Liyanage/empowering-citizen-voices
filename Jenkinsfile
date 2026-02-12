pipeline {
    agent any  // Uses the main Jenkins agent (our custom image with Node + Docker)
    
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        IMAGE_PREFIX = 'pasanx/empowering'
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Pasan-Liyanage/empowering-citizen-voices.git',
                    credentialsId: 'github-creds'
            }
        }

        stage('Install & Test Backend') {
            steps {
                dir('Server') {
                    sh 'npm ci'
                    // Uncomment if you have tests: sh 'npm test'
                }
            }
        }

        stage('Install & Build Frontend') {
            steps {
                dir('client') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Build backend
                    sh """
                        docker build \
                        -t ${IMAGE_PREFIX}-server:${BUILD_NUMBER} \
                        -t ${IMAGE_PREFIX}-server:latest \
                        ./Server
                    """
                    
                    // Build frontend
                    sh """
                        docker build \
                        -t ${IMAGE_PREFIX}-client:${BUILD_NUMBER} \
                        -t ${IMAGE_PREFIX}-client:latest \
                        ./client
                    """
                }
            }
        }

        stage('Push to Registry') {
            steps {
                sh """
                    echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin
                    docker push ${IMAGE_PREFIX}-server:${BUILD_NUMBER}
                    docker push ${IMAGE_PREFIX}-server:latest
                    docker push ${IMAGE_PREFIX}-client:${BUILD_NUMBER}
                    docker push ${IMAGE_PREFIX}-client:latest
                '''
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'
            sh 'docker system prune -f || true'
        }
    }
}