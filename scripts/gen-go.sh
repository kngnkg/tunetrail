#! /bin/bash

set -e

# 生成ファイルを格納するフォルダのベースパス
BASE_OUT_DIR="./backend/gen"

# proto ファイルのパス
PROTO_PATH="./proto"

MODULE_BASE="github.com/kngnkg/tunetrail/backend/gen"

# proto のコンパイル
for PROTO_FILE in ${PROTO_PATH}/*.proto; do
    # ファイル名からアンダースコアを削除し、拡張子を除く
    PACKAGE_NAME="$(basename ${PROTO_FILE} .proto | tr -d '_')"

    # 出力先フォルダのパス
    OUT_DIR="${BASE_OUT_DIR}/${PACKAGE_NAME}"

    mkdir -p ${OUT_DIR}

    # モジュール名
    MODULE_NAME="${MODULE_BASE}/${PACKAGE_NAME}"

    protoc \
        --proto_path="${PROTO_PATH}" \
        --go_out="${OUT_DIR}" \
        --go_opt=module="${MODULE_NAME}" \
        --go-grpc_out="${OUT_DIR}" \
    	--go-grpc_opt=module="${MODULE_NAME}" \
        ${PROTO_FILE}
done
