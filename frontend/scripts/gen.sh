#! /bin/bash

# protoc(proto ファイルから各種ファイルを生成するコンパイラ)のパス
NODE_PROTOC="./node_modules/.bin/grpc_tools_node_protoc"

# TypeScript 用のファイルを生成するためのプラグインのパス
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# 生成ファイルを格納するフォルダのベースパス
BASE_OUT_DIR="./generated"

# proto ファイルのパス
PROTO_PATH="../proto"

# proto のコンパイル
for PROTO_FILE in ${PROTO_PATH}/*.proto; do
    OUT_DIR="${BASE_OUT_DIR}/$(basename ${PROTO_FILE} .proto)"

    mkdir -p ${OUT_DIR}

    $NODE_PROTOC \
        --proto_path="${PROTO_PATH}" \
        --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
        --js_out="import_style=commonjs,binary:${OUT_DIR}" \
        --ts_out="service=grpc-node,mode=grpc-js:${OUT_DIR}" \
        --grpc_out="grpc_js:${OUT_DIR}" \
        ${PROTO_PATH}/*.proto
done
