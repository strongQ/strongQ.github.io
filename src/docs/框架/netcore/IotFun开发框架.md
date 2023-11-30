# IotFun平台

IotFun是一个用net6+vue3.0+grpc+sqlsugar+furion+signalr+iotclient构建的数采平台，包含vue前端、api后端、数采平台（数采服务端、数采客户端、数采web客户端）。

# 1、平台亮点

1. 平台有独立与web系统之外的数采调度服务端，统筹所有设备数据并分发控制指令。
2. 数采平台可以部署为windows服务，并且已经用于生产环境中，比较稳定。
3. 数采客户端可以分布式部署单独绑定设备，数采服务端也可以绑定设备独立运行，适应各种复杂场景。
4. 自带设备实时日志和历史日志，便于了解设备采集详情。
5. 数采服务端解耦调度业务，动态加载特有的调度业务。
6. 集成IotClient，便于扩展采集协议。
7. 通过表达式可以对数据进行简单处理。

# 2、功能设计

- 数采客户端，客户端绑定设备。可以分布式部署多个客户端。
- 数采web客户端，可以绑定设备，使用web api与第三方对接。
- 数采服务端同时也是调度服务端只有1个，也可以绑定设备，单独使用。
- IotFun类库为admin.web使用，前端界面和业务在其中。
- IotFunClient为采集客户端解决方案文件夹，包含IotClientService（客户端采集服务业务）IotClientConsole（客户端采集程序）、IotClientWeb（其它web客户端）SyncSocketModuleCore等程序集
- IotFunServer为监听服务解决方案文件夹，包含IotContract、IotServer（grpc服务端），IotServerService（服务端操作逻辑、数据库访问等）
- IotProcess为调度程序解决方案文件夹，包含扩展的调度项目，调度和数据处理都在该项目中。生成后部署到ProcessExtensions文件夹中（支持多个项目同时启动）。
- 集成SignalR服务，传输各个客户端的日志。

# 3、采集逻辑

- 提交状态（持久化）并拉取控制指令，执行控制指令
- 设备客户端推送数据到服务端 ServerDataBaseManager接收

# 4、扩展协议

集成IotClient开源库，支持大多数设备，可以参考SiemensS7Managerz。

1. IotClientService（客户端采集服务业务）包含不同设备的数据采集功能，设备以协议维度进行扩展，扩展步骤如下：

```csharp
 1. 实现设备的Manager和Operation,继承 EquipBaseManager<T,K>和IEquipOperation<T>,
T是设备采集的dto对象，横向扩展采集属性。
K是推送到服务端的dto对象，只推送需要用到的关键属性。
```

1. IotServerService（服务端数据存储业务）包含不同设备的数据仓储，数据以协议维度进行扩展，扩展步骤如下：

```csharp
1. 实现数据的DataManager,继承 ServerDataBaseManager<K>
K是推送到服务端的dto对象，只推送需要用到的关键属性。
```

# 5、调度扩展

调度程序处于IotProcess解决方案文件夹中，服务端通过反射注册服务，并提供接口对外提供数据。

```csharp
            // 设备调度
            var handles=types.Where(x=>x.IsClass && !x.IsAbstract && x.GetInterface(nameof(IServerProcessHandle))!=null);
            foreach(var handle in handles)
            {
                services.AddSingleton(typeof(IServerProcessHandle), handle);
            }
            //开放数据
           var processOpen = types.FirstOrDefault(x => x.IsClass && !x.IsAbstract && x.GetInterface(nameof(IProcessOpenProvider)) != null);

            if (processOpen != null)
            {
                services.AddSingleton(typeof(IProcessOpenProvider), processOpen);
            }
            // 调度入口
            var imple= types.FirstOrDefault(x => x.IsClass && !x.IsAbstract && x.GetInterface(nameof(IServerMainProcess)) != null);
            services.AddSingleton(typeof(IServerMainProcess), imple);

            var injects = types.Where(x => x.IsClass && !x.IsAbstract && x.Name.EndsWith("Service", StringComparison.OrdinalIgnoreCase));
            foreach(var inject in injects)
            {
                var inter = inject.GetInterface("I" + inject.Name);
                if (inter != null)
                {
                    services.AddSingleton(inter, inject);
                }
            }
```