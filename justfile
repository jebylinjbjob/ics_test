set windows-shell := ["powershell.exe", "-NoProfile", "-Command"]

default:
    @just --list

init:
    pnpm install
    pnpm exec playwright install --with-deps chromium

build:
    pnpm run build

run:
    pnpm run dev

lint:
    pnpm run lint

fmt:
    pnpm run format

test:
    pnpm run test

check:
    pnpm run check

# 快速檢查（跳過測試和建置，適合開發時使用）
quick:
    pnpm run check
    pnpm run lint

fmt-check:
    pnpm run fmt:check

# 完整 CI 檢查（包含測試和建置）
ci:
    pnpm run check
    pnpm run fmt:check
    pnpm run lint
    pnpm run test
    pnpm run build
