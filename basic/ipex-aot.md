
# AOT (Ahead-Of-Time) 编译 {#aot}

【Ahead-Of-Time (AOT) 编译】可以翻译为【预编译】，与之相对的另一种编译模式是【Just-In-Time (JIT) 编译】，即【即时编译】。

## 怎么理解 AOT 和 JIT

[IPEX](/basic/ipex) 中实现了各种各样的算子，比如矩阵乘法、卷积等等，这些算子是 AI 模型的基本组成单元。

为了支持 Intel 显卡，IPEX 中的这些算子是用 [SYCL](https://www.khronos.org/sycl/) 这种高级异构高性能计算编程语言实现的。

在 IPEX 软件包到达用户手中之前，IPEX 的开发者们需要先将这些 SYCL 源码编译成更加底层的格式。

第一步，就是将 SYCL 源码编译成 [SPIR-V](https://www.khronos.org/spir/) 格式，这种格式是一种**与硬件无关的通用中间格式**，但是 SPIR-V 格式的代码无法直接在硬件上运行。

第二步，进一步将 SPIR-V 格式的代码编译，生成最底层的硬件指令代码。不同的硬件支持不同的硬件指令，因此如果目标硬件不同，同一套 SPIR-V 代码也会被编译成不同的硬件指令代码。

**问题来了：第二步什么时候做？**

### AOT

所谓 AOT，就是指 IPEX 开发者提前将所有算子的 SPIR-V 代码全部**提前编译**为最终硬件指令代码，再打包到 IPEX 软件包中。要支持不同的硬件指令架构，那就必须对各硬件架构分别编译出硬件指令代码。

例如，Intel 官方发布的 [IPEX v2.1.10+xpu](https://github.com/intel/intel-extension-for-pytorch/releases/tag/v2.1.10%2Bxpu) （以及之后的版本）就包含了支持 Intel Arc 独立显卡的预编译硬件指令代码。

如此以来，Intel Arc 独显用户安装 IPEX 并运行 PyTorch 程序后，即可直接执行对应算子的硬件指令代码，用户没有额外的开销。

### JIT

JIT 则恰好相反，SPIR-V 代码到硬件指令的编译过程在用户端完成。

例如，Intel 官方发布的 [IPEX v2.1.30+xpu](https://github.com/intel/intel-extension-for-pytorch/releases/tag/v2.1.30%2Bxpu) 仍然没有正式支持 Intel Core Ultra 核显，也就意味着软件包里不包含针对 Core Ultra 核显架构的 AOT 预编译硬件指令代码。当然，软件包里总会同时包含所有算子的 SPIR-V 代码，作为预案。

Intel Core Ultra 核显用户安装 IPEX 并运行 PyTorch 程序后，由于无法找到对应的 AOT 预编译代码，只能再调用显卡驱动中的编译器将 IPEX 里提供的 SPIR-V 代码再编译成为 Core Ultra 核显架构的硬件指令代码，而后才能执行。

**如此可见，JIT 是将 SPIR-V 到硬件指令代码编译的开销交给了用户。** IPEX 中的算子成千上万，在用户端编译完所有的 SPIR-V 代码通常需要花上十几分钟甚至几个小时。这对于用户来说显然是无法接受的。

## 开源的力量：民间版 AOT IPEX

以上说明了 AOT 为什么是刚需。

好在 IPEX 是一个开源项目，即使官方发布的版本缺少了一些硬件架构的 AOT 支持，开源社区的开发者也可以自行制作满足需求的 AOT 版本。

因此，[Nuullll](https://github.com/Nuullll) 在官方 [IPEX v2.0.110+xpu](https://github.com/intel/intel-extension-for-pytorch/releases/tag/v2.0.110%2Bxpu) 还不支持 Arc 独显 AOT 的时候，就自己制作了[一版支持 Arc AOT 的 IPEX](https://github.com/Nuullll/intel-extension-for-pytorch/releases/tag/v2.0.110%2Bxpu-master%2Bdll-bundle)。

后来又制作了[一版支持 Core Ultra 核显 AOT 的 IPEX](https://github.com/Nuullll/intel-extension-for-pytorch/releases/tag/v2.1.20%2Bmtl%2Boneapi)。

详情可以查看[资源发布 - IPEX AOT 预编译包](/resource.md#ipex-aot-预编译包)。
