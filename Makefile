# 최근 블로그 글 목록 JSON 생성 (dev에서 수동 생성 시)
# 사용: make 또는 make generate-recent-posts
.PHONY: generate-recent-posts

generate-recent-posts:
	node scripts/generate-recent-blog-posts.mjs

# 기본 타깃: JSON 생성
all: generate-recent-posts
