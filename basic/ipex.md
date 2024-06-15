# IPEX

IPEX 的全称是 Intel® Extension for PyTorch*，是 Intel 官方推出的 PyTorch 扩展库。

开源项目链接：[intel-extension-for-pytorch](https://github.com/intel/intel-extension-for-pytorch)

::: info
*翻译自 [IPEX README](https://github.com/intel/intel-extension-for-pytorch/blob/c1dc7ae7ec1ead2c9c53f068b0ac81ce91bb1f51/README.md)*

Intel® Extension for PyTorch* 通过最新的功能优化对 PyTorch* 进行了扩展，从而在 Intel 硬件上实现额外的性能提升。优化利用英特尔 CPU 上的 AVX-512，VNNI，AMX 以及英特尔独立显卡的 XMX 矩阵扩展 AI 引擎。此外，IPEX 通过 PyTorch* xpu 设备为英特尔独立显卡提供易用的 GPU 加速。
:::

[2024/4/20] 时至今日，[PyTorch 官网](https://pytorch.org/)上仍然没有支持 Intel 显卡的版本，因此必须使用 IPEX 才能在 Intel 显卡上运行 PyTorch 应用。
