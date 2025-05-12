import jenkins.model.*
import hudson.model.*
import org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition
import org.jenkinsci.plugins.workflow.job.WorkflowJob

// Get Jenkins instance
def jenkins = Jenkins.getInstanceOrNull()

// Create a Pipeline job
def jobName = "Node-CICD-Pipeline"
def existingJob = jenkins.getItem(jobName)

if (existingJob) {
    jenkins.remove(existingJob)
}

def job = jenkins.createProject(WorkflowJob, jobName)

// Define the Pipeline script
def pipelineScript = """
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/PrashantPatil10178/CI-CD.git'
            }
        }
        
        stage('Build') {
            steps {
                dir('app') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Test') {
            steps {
                dir('app') {
                    script {
                        // Kill any existing node processes using port 3000
                        sh 'pkill -f "node.*3000" || true'
                        sh 'npm test'
                    }
                }
            }
        }
    }
    
    post {
        always {
            // Cleanup any test servers
            sh 'pkill -f "node.*3000" || true'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check logs for errors.'
        }
    }
}
"""

// Set the Pipeline definition
job.setDefinition(new CpsFlowDefinition(pipelineScript, true)) // true for sandbox mode

// Save the job
job.save()

println "Successfully created/updated Pipeline job: ${jobName}"