# AvaloniaXT
Avalonia App Page Helper Dll , Contains MainWindow，SukiUI，Support AOT。
```
dotnet add package AvaloniaXT --version 1.0.0
```

# 项目组成
- AvaloniaXT Nuget通用页面程序集，包含主窗口和一些通用的扩展方法。
- XTExternalPage 扩展界面程序集，包含定制化的业务界面。
- AvaloniaXT.Desktop 桌面程序启动入口。
- AvaloniaXT.Android 可以运行， Microsoft.Maui.Essentials 可以使用Essentials全部功能。
- SukiUI [引用的SukiUI项目](https://github.com/kikipoulet/SukiUI) 修改了ProgressBar的MiniHeight、添加一些控件。

# 系统界面
![systemimage](img/AvaloniaXT.png)

# 国际化支持
```
  public override void OnFrameworkInitializationCompleted()
  {
     // Lang.Resources.Culture = new CultureInfo("en-US");
     // Register.InitialCulture("en-US");    
  }

  直接编辑 Resources.resx 添加语言
```

# AOT支持
## 要点
1. 不使用反射
2.  编译绑定必须置为true   
```
<AvaloniaUseCompiledBindingsByDefault>true<AvaloniaUseCompiledBindingsByDefault>
```
3. 反序列化使用源映射
```
// 提供GetJsonOptions静态方法
var options = UrlUtilities.GetJsonOptions();
options.TypeInfoResolver = ApiJsonContext.Default;
var result = JsonSerializer.Deserialize<AdminCodeResult<EcsMainView>>(data, options);



    [JsonSerializable(typeof(AdminCodeResult<EcsMainView>))]
    public partial class ApiJsonContext: JsonSerializerContext
    {
    }
```

## SQL ORM
- 测试使用FreeSQL,Npgsql需升级到最新版本。
- 需要在启动项目中包含rd.xml
```
// 项目中包含
<ItemGroup>
		<RdXmlFile Include="rd.xml" />
</ItemGroup>


<Directives xmlns="http://schemas.microsoft.com/netfx/2013/01/metadata">
	<Application>
		
		<Assembly Name="XTExternalPage"  Dynamic="Required All">
		</Assembly>

		<Assembly Name="FreeSql"  Dynamic="Required All">
		</Assembly>
		<Assembly Name="Npgsql"  Dynamic="Required All">
		</Assembly>
	</Application>
</Directives>
```

# AvaloniaXT使用步骤
安装完 AvaloniaXT Nuget包后
## 1、启动入口 添加 Font Awesomon支持（可选）
```
 public static AppBuilder BuildAvaloniaApp()
 {
   Register.AddIcons();
   return  AppBuilder.Configure<App>()
         .UsePlatformDetect()
         .WithInterFont()
         .LogToTrace();
 }

 // 页面中使用
 <i:Icon Value="{Binding Condition}" FontSize="{Binding Width}" />
```

##  2、在App.xaml中添加页面选择器、样式、底部托盘（可选）
- 页面和弹窗VM都需要继承XTBasePage(提供GetView()方法，注入视图），弹窗还需要重写IsDialog()方法，返回true。
```
 <Application.DataTemplates>
     <xt:ViewLocator/>
 </Application.DataTemplates>

    <Application.Styles>
			
		<sukiUi:SukiTheme ThemeColor="Blue"  />

		<avalonia:MaterialIconStyles />
    
    </Application.Styles>


// 项目中包含资源，使用方式
<ItemGroup>
	<AvaloniaResource Include="Assets\**" />
</ItemGroup>




<TrayIcon.Icons>
	<TrayIcons>
		<TrayIcon Icon="/Assets/alarm.ico" Clicked="NativeMenuItem_Show"
				  ToolTipText="AvaloniaXT">
			<TrayIcon.Menu>
				<NativeMenu>
					<NativeMenuItem Header="Settings">
						<NativeMenu>
							<NativeMenuItem Header="Show" Click="NativeMenuItem_Show"  />
							<NativeMenuItem Header="Exit" Click="NativeMenuItem_Click"  />							
						</NativeMenu>
					</NativeMenuItem>
				</NativeMenu>
			</TrayIcon.Menu>
		</TrayIcon>
	</TrayIcons>
</TrayIcon.Icons>


 private void NativeMenuItem_Click(object? sender, EventArgs e)
 {
     if (Application.Current?.ApplicationLifetime is IClassicDesktopStyleApplicationLifetime lifetime)
     {
         lifetime?.Shutdown();
         
     }
 }

 private void NativeMenuItem_Show(object? sender, EventArgs e)
 {
     if (Application.Current?.ApplicationLifetime is IClassicDesktopStyleApplicationLifetime lifetime)
     {
         var window = lifetime?.MainWindow;
         window.WindowState = WindowState.Normal;
         window.Show();


     }
 }
```
## 3、在App中注入服务
```
 var services = new ServiceCollection();

 // 注入 AvaloniaXT中的服务
 services.InitialXTServices();

 // 注入业务界面服务
 // services.AddSingleton<DbService>();

 // 注入界面，界面ViewModel需要
 services.AddSingleton<XTPageBase, PhoneTestViewModel>();

 // 注入Dialog界面，需要定义Key
 services.AddKeyedSingleton<XTPageBase, SearchDialogViewModel>("Search");

 // 界面配置
 services.AddSingleton<IMenuToolService, MenuToolService>();

 _provider = services.BuildServiceProvider();


  public override void OnFrameworkInitializationCompleted()
 {
     // 添加 AvaloniaXT 的方法
     ApplicationLifetime?.InitialCompleted(_provider);

     base.OnFrameworkInitializationCompleted();
 }
```

# 辅助方法

## 视图选择器
```
 public class EcsTagSelector : DataTemplateSelector
 {
     public override string GetKey(object? param)
     {
         var tag = param as UnitTagModel;
         return tag.Type.ToString();
     }
     
 }

<ItemsControl.DataTemplates>
	<selector:EcsTagSelector>		
		<DataTemplate x:Key="Other">
			<cp:UnitOther></cp:UnitOther>
		</DataTemplate>
		<!--<DataTemplate x:Key="XX">
			<cp:UnitXX></cp:UnitXX>
		</DataTemplate>-->
	</selector:EcsTagSelector>
</ItemsControl.DataTemplates>

```

## Dialog弹窗
```
// windows窗体
await SukiHost.ShowToast();
// 支持所有平台
InteractiveContainer.ShowToast()
```


# 1.0.2版本后使用方法
## 1、引入对应包
- AvaloniaXT    >1.0.2
- XT.AvaloniaUpdater  >1.0.0

## 2、入口代码调整

1. 桌面版
```c#
sealed class Program
{
    // Initialization code. Don't use any Avalonia, third-party APIs or any
    // SynchronizationContext-reliant code before AppMain is called: things aren't initialized
    // yet and stuff might break.
    [STAThread]
    public static void Main(string[] args) => BuildAvaloniaApp()
        .StartWithClassicDesktopLifetime(args);

  
    public static AppBuilder BuildAvaloniaApp()
    {

        App.InitializingEvent += App_InitializingEvent;
        App.UpdateEvent += App_UpdateEvent;
        App.AutoUpdateEvent += App_AutoUpdateEvent;

        return AppBuilder.Configure<App>()
              .UsePlatformDetect()
              .WithInterFont()
              .LogToTrace();
    }

    private async static void App_UpdateEvent(object? sender, IApiConfig e)
    {
        App.MainWindow.AttachDevTools();
        await new UpdateHelper().CallUpdate(e.RemoteApiUrl, 80);
    }

    // 注入其它页面的服务
    private static void App_InitializingEvent(object? sender, ServiceCollection e)
    {
     
        e.InitializeOthers();
    }

    /// <summary>
    /// 触发更新
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="e"></param>
    private async static void App_AutoUpdateEvent(object? sender, XT.Common.Interfaces.IApiConfig e)
    {
        await new UpdateHelper().AutoCallUpdate(e.RemoteApiUrl, 80);
    }

}
```

2. android版本
```c#
  [Activity(
       
      Label = "AvaloniaXT.Android",
      Theme = "@style/MyTheme.NoActionBar",
      Icon = "@drawable/icon",
      MainLauncher = true,
      ConfigurationChanges =  ConfigChanges.Orientation | ConfigChanges.ScreenSize | ConfigChanges.UiMode)]
  public class MainActivity : AvaloniaMainActivity<App>
  {
      protected override AppBuilder CustomizeAppBuilder(AppBuilder builder)
      {
          App.InitializingEvent += App_InitializingEvent;
          return base.CustomizeAppBuilder(builder)
              .WithInterFont();

      }

      private void App_InitializingEvent(object? sender, Microsoft.Extensions.DependencyInjection.ServiceCollection e)
      {
          e.InitializeOthers();
          e.AddSingleton<IPlatformService, AndroidPlatformService>();
      }
  }


  

  
```
```c#
// AdroidPlatformService 更新
  public class AndroidPlatformService : IPlatformService
  {
      public event EventHandler<int> RefreshEvent;
      
      IHttpClientFactory _httpClientFactory;
      public string ErrorMsg { get; set; }

      private long totalBytes;

      private long receivedBytes;

      public AndroidPlatformService(IHttpClientFactory httpClientFactory)
      {
          _httpClientFactory = httpClientFactory;
          
      }

      public async Task<bool> RequestStoragePermissionAsync()
      {
          // 使用 Xamarin.Essentials 或 MAUI 的权限 API
          var status = await Permissions.RequestAsync<Permissions.StorageWrite>();
          return status == PermissionStatus.Granted;
      }

      public Task ShowToastAsync(string message)
      {
          if (OperatingSystem.IsAndroid())
          {
              
              Toast.MakeText(Application.Context, message, ToastLength.Short)!.Show();
          }
          else
          {
              // 其他平台的实现
          }
          return Task.CompletedTask;
      }

      public async void InstallApk(string path)
      {
          var context = Application.Context;
          var file = new Java.IO.File(path);

          if (!file.Exists())
          {
             await ShowToastAsync("APK文件不存在");
              return;
          }
          file.SetReadable(true, false); // 允许其他应用读取
          file.SetWritable(true, false);

          var authority = $"{context.PackageName}.fileprovider";
          var uri = AndroidX.Core.Content.FileProvider.GetUriForFile(context, authority, file);

          var intent = new Intent(Intent.ActionView)
              .SetDataAndType(uri, "application/vnd.android.package-archive")
              .AddFlags(ActivityFlags.NewTask | ActivityFlags.GrantReadUriPermission);
          
          if (intent.ResolveActivity(context.PackageManager) != null)
          {
              context.StartActivity(intent);
              return;
          }
          else
          {
              await ShowToastAsync("没有找到安装程序");
              return;
          }
          //var context = Application.Context;
          //var fileUri = Microsoft.Maui.Storage.FileProvider.GetUriForFile(context, context.PackageName + ".fileprovider", new Java.IO.File(path));
          //var intent = new Intent(Intent.ActionView);
          //intent.SetDataAndType(fileUri, "application/vnd.android.package-archive");
          //intent.AddFlags(ActivityFlags.GrantReadUriPermission | ActivityFlags.NewTask);
          //context.StartActivity(intent);
      }


      public async Task<bool> DownloadFileAsync(string fileUrl, string outputPath)
      {
          totalBytes = 0;
          receivedBytes = 0;
          RefreshEvent?.Invoke(this, 0);
         
          using var client = _httpClientFactory.CreateClient();
          client.DefaultRequestHeaders.Accept.Clear();
          client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/octet-stream"));

          try
          {
              // 异步地获取响应
              using var response = await client.GetAsync(fileUrl, HttpCompletionOption.ResponseHeadersRead);
              response.EnsureSuccessStatusCode();

              // 获取文件总大小
              totalBytes = response.Content.Headers.ContentLength ?? 0;

              // 获取输入流
              await using var inputStream = await response.Content.ReadAsStreamAsync();

              // 创建输出文件流
              await using var outputStream = System.IO.File.Create(outputPath);

              var buffer = new byte[8192];
              int bytesRead;

              // 读取数据并写入输出文件，同时更新进度
              while ((bytesRead = await inputStream.ReadAsync(buffer, 0, buffer.Length)) > 0)
              {
                  // 在异步任务中写入输出流
                  await outputStream.WriteAsync(buffer, 0, bytesRead);
                  receivedBytes += bytesRead;

                  // 计算进度并更新 UI 线程
                  int value = (int)((receivedBytes / (double)totalBytes) * 100);

                  RefreshEvent?.Invoke(this, value);
              }

              return true; // 下载完成
          }
          catch (Exception ex)
          {
              await ShowToastAsync($"下载失败: {ex.Message}");
              return false;
          }
      }
  }

```


## 3、新建页面程序集

### 3.1、代码结构
1. Assets文件夹，新增 App.json，作为配置文件，需要在服务中设置IApiConfig的RemoteApiUrl

2. Lanuages文件夹，新增 EN-US.json和ZH-CN.json文件，多语言配置，需要包含菜单名称
```json
{
  "MainTitle": "Test System",
  "MenuTitle": "Test"
}
```

3. Services文件夹，新增MenuToolService.cs和StartupService.cs,作为入口配置服务

```c#
  public MenuToolService(IConfiguration configuration,IApiConfig apiConfig)
  {
      apiConfig.RemoteApiUrl = configuration["AppSettings:RemoteApiUrl"];
  }

```

## 3.2、服务注入Register.cs
```c#
public static class Register
{
    /// 初始化程序集服务
    /// </summary>
    /// <param name="services"></param>

    public static void InitializeOthers(this ServiceCollection services)
    {
        services.AddSingleton<IMenuToolService, MenuToolService>();
        services.AddSingleton<IStartupService, StartupService>();
        services.AddSingleton<EcsTagApi>();

        var langurage = App.Provider.GetService<AvaloniaXT.Services.Language>();


        //添加语言配置文件
        langurage.AddLangUrl(new AvaloniaXT.Models.LangUrl
        {
            LangType = "ZH-CN",
            LangConfigUrl = "avares://ExternalPage/Languages/ZH-CN.json"
        });
        langurage.AddLangUrl(new AvaloniaXT.Models.LangUrl
        {
            LangType = "EN-US",
            LangConfigUrl = "avares://ExternalPage/Languages/EN-US.json"
        });

        services.InitialJsonConfig("ExternalPage/Assets/App.json");



        services.AddSingleton<XTPageBase, DemoViewModel>();

        // 弹窗
        services.AddTransient<DetailPageDialogViewModel>();


    }
}
```

## 4、相关用法

### 4.1、弹窗
```c#
      DialogBuilder<DetailPageDialogViewModel>
          .Create()
          .WithConfiguration(vm =>
          {
              vm.Detais = detail;
          })
          .WithTitle(Language.Lang["StackerEquipment"] + ":" + tag.Id)
          .Show();
```

### 4.2、右下角弹窗
```c#
public ISukiToastManager ToastManager { get; }

ToastManager.CreateSimpleInfoToast().OfType(Avalonia.Controls.Notifications.NotificationType.Error).WithTitle("ERROR").WithContent(e.Content).Queue();
```