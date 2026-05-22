pipeline {
    agent any

    environment {
        // Docker image names
        BACKEND_IMAGE = 'reliefsync-backend'
        FRONTEND_IMAGE = 'reliefsync-frontend'
        // Docker Compose file
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Build') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build'
                }
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend') {
                    sh 'mvn test'
                }
            }
        }

        stage('Frontend Tests') {
            steps {
                dir('frontend') {
                    sh 'npm test'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                docker-compose -f ${DOCKER_COMPOSE_FILE} build
                '''
            }
        }

        stage('Docker Compose Up') {
            steps {
                sh '''
                docker-compose -f ${DOCKER_COMPOSE_FILE} up -d
                '''
                // Wait for services to be healthy
                sh 'sleep 30'
                sh '''
                docker-compose -f ${DOCKER_COMPOSE_FILE} ps
                '''
            }
        }

        stage('Smoke Tests') {
            steps {
                // Basic curl tests to ensure services are up
                sh '''
                echo "Testing backend health..."
                for i in {1..10}; do
                    if curl -s http://localhost:8081/api/health 2>/dev/null | grep -q '"status":"UP"'; then
                        echo "Backend is healthy"
                        break
                    fi
                    echo "Waiting for backend..."
                    sleep 5
                done
                '''
                sh '''
                echo "Testing frontend availability..."
                for i in {1..10}; do
                    if curl -sf http://localhost/ >/dev/null 2>&1; then
                        echo "Frontend is reachable"
                        break
                    fi
                    echo "Waiting for frontend..."
                    sleep 5
                done
                '''
            }
        }

        stage('Clean Up') {
            when {
                expression {
                    // Only clean up if we are not preserving artifacts for debugging
                    return true
                }
            }
            steps {
                sh '''
                docker-compose -f ${DOCKER_COMPOSE_FILE} down
                '''
            }
        }
    }

    post {
        always {
            // Archive test results and artifacts
            junit '**/target/surefire-reports/*.xml'
            junit '**/frontend/reports/*.xml' // Adjust if frontend test output is different
            archiveArtifacts artifacts: 'backend/target/*.jar, frontend/dist/**', fingerprint: true
        }
        failure {
            mail to: 'team@example.com',
                 subject: "Failed Pipeline: ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                 body: "Something is wrong with ${env.JOB_NAME}."
        }
        success {
            mail to: 'team@example.com',
                 subject: "Successful Pipeline: ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                 body: "Pipeline successful."
        }
    }
}
