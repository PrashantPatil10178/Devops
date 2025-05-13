same but for practical 14 ci.yml

```bash
name: CI Pipeline - Build Report and Logs

on:
push:
branches: [main]

jobs:
build:
runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Run build and generate logs/reports
        run: |
          mkdir -p build
          bash scripts/build.sh | tee build/build-log.txt

      - name: Upload build log and report
        uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: |
            build/build-log.txt
            build/build-report.txt

```

bash.sh for the practical 14

```bash
#!/bin/bash

BUILD_START=$(date +%s)
echo "========== BUILD START =========="
echo "Date: $(date)"
echo "Compiling project..."
sleep 2
echo "Build completed successfully!"
echo "========== BUILD END =========="

BUILD_END=$(date +%s)
BUILD_DURATION=$((BUILD_END - BUILD_START))

# Generate report

mkdir -p build
{
echo "Build Report"
echo "============"
echo "Status: SUCCESS"
echo "Date: $(date)"
echo "Duration: ${BUILD_DURATION}s"
} > build/build-report.txt
```
