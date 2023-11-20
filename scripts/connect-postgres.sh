#! /bin/bash

ENV=""
LOCAL_PORT=""

while getopts "e:p:" opt; do
  case $opt in
    e)
	 ENV=$OPTARG
      ;;
	p)
	  LOCAL_PORT=$OPTARG
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

REMOTE_HOST=""

# すべてのRDSインスタンスのARNを取得
instances=$(aws rds describe-db-instances | jq -r '.DBInstances[].DBInstanceArn')

# 各インスタンスのタグを確認し、特定のNameタグがある場合にそのインスタンスの情報を表示
for instance in $instances; do
    name_tag=$(aws rds list-tags-for-resource --resource-name $instance | jq -r '.TagList[] | select(.Key=="Name") | .Value')
    if [ "$name_tag" == "foderee-$ENV-rds" ]; then
        REMOTE_HOST=$(aws rds describe-db-instances --db-instance-identifier $(basename $instance) | jq -r '.DBInstances[].Endpoint.Address')
    fi
done

./scripts/connect-remote-host.sh \
	-e dev -h $REMOTE_HOST -r 5432 -l $LOCAL_PORT
