#! /bin/bash

# 踏み台ホストが起動していることが前提

set -e

CLUSTER_NAME=""
SERVICE_NAME=""
HOST_NAME=""
REMOTE_PORT_NUMBER=""
LOCAL_PORT_NUMBER=""

# e: 環境名
# h: 接続先のホスト名
# r: 接続先のポート番号
# l: ローカル側のポート番号

while getopts "e:h:r:l:" opt; do
  case $opt in
    e)
	if [ $OPTARG = "dev" ]; then
		CLUSTER_NAME="foderee-dev-cluster"
		SERVICE_NAME="foderee-dev-jumphost-service"
	elif [ $OPTARG = "prod" ]; then
		CLUSTER_NAME="foderee-prod-cluster"
		SERVICE_NAME="foderee-prod-jumphost-service"
	else
		echo "無効な環境名: -$OPTARG" >&2
	fi
      ;;
	h)
	  HOST_NAME=$OPTARG
	  ;;
	r)
	  REMOTE_PORT_NUMBER=$OPTARG
	  ;;
	l)
	  LOCAL_PORT_NUMBER=$OPTARG
	  ;;
    \?)
      echo "無効なオプション: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "オプション -$OPTARG には引数が必要です" >&2
      exit 1
      ;;
  esac
done

# 起動中のタスクARNを取得
TASK_ARN=$(aws ecs list-tasks \
	--cluster ${CLUSTER_NAME} \
	--service ${SERVICE_NAME} \
	--desired-status RUNNING | jq -r '.taskArns[0]')

# タスクARNからタスクの情報を取得
TASK_INFO=$(aws ecs describe-tasks \
	--cluster ${CLUSTER_NAME} \
	--tasks ${TASK_ARN})

# タスクIDを取得
TASK_ID=$(echo ${TASK_ARN} | cut -d '/' -f 3)

# ランタイムIDを取得
RUNTIME_ID=$(echo ${TASK_INFO} | jq -r '.tasks[0].containers[0].runtimeId')

# セッションを開始
aws ssm start-session \
    --target ecs:${CLUSTER_NAME}_${TASK_ID}_${RUNTIME_ID} \
    --document-name AWS-StartPortForwardingSessionToRemoteHost \
    --parameters '{"host":["'${HOST_NAME}'"],"portNumber":["'${REMOTE_PORT_NUMBER}'"], "localPortNumber":["'${LOCAL_PORT_NUMBER}'"]}'
