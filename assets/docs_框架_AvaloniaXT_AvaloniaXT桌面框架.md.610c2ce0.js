import{_ as s,o as a,c as n,U as l}from"./chunks/framework.83a19234.js";const t="/assets/AvaloniaXT.0e6e51f1.png",d=JSON.parse('{"title":"AvaloniaXT","description":"","frontmatter":{},"headers":[],"relativePath":"docs/框架/AvaloniaXT/AvaloniaXT桌面框架.md","filePath":"docs/框架/AvaloniaXT/AvaloniaXT桌面框架.md","lastUpdated":1706152240000}'),e={name:"docs/框架/AvaloniaXT/AvaloniaXT桌面框架.md"},p=l('<h1 id="avaloniaxt" tabindex="-1">AvaloniaXT <a class="header-anchor" href="#avaloniaxt" aria-label="Permalink to &quot;AvaloniaXT&quot;">​</a></h1><p>Avalonia App Page Helper Dll , Contains MainWindow，SukiUI，Support AOT。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">dotnet add package AvaloniaXT --version 1.0.0</span></span></code></pre></div><h1 id="项目组成" tabindex="-1">项目组成 <a class="header-anchor" href="#项目组成" aria-label="Permalink to &quot;项目组成&quot;">​</a></h1><ul><li>AvaloniaXT Nuget通用页面程序集，包含主窗口和一些通用的扩展方法。</li><li>XTExternalPage 扩展界面程序集，包含定制化的业务界面。</li><li>AvaloniaXT.Desktop 桌面程序启动入口，android和ios没有测试过。</li><li>SukiUI <a href="https://github.com/kikipoulet/SukiUI" target="_blank" rel="noreferrer">引用的SukiUI项目</a> 修改了ProgressBar的MiniHeight。</li></ul><h1 id="系统界面" tabindex="-1">系统界面 <a class="header-anchor" href="#系统界面" aria-label="Permalink to &quot;系统界面&quot;">​</a></h1><p><img src="'+t+`" alt="systemimage"></p><h1 id="aot支持" tabindex="-1">AOT支持 <a class="header-anchor" href="#aot支持" aria-label="Permalink to &quot;AOT支持&quot;">​</a></h1><h2 id="要点" tabindex="-1">要点 <a class="header-anchor" href="#要点" aria-label="Permalink to &quot;要点&quot;">​</a></h2><ol><li>不使用反射</li><li>编译绑定必须置为true</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;AvaloniaUseCompiledBindingsByDefault&gt;true&lt;AvaloniaUseCompiledBindingsByDefault&gt;</span></span></code></pre></div><ol start="3"><li>反序列化使用源映射</li></ol><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 提供GetJsonOptions静态方法</span></span>
<span class="line"><span style="color:#A6ACCD;">var options = UrlUtilities.GetJsonOptions();</span></span>
<span class="line"><span style="color:#A6ACCD;">options.TypeInfoResolver = ApiJsonContext.Default;</span></span>
<span class="line"><span style="color:#A6ACCD;">var result = JsonSerializer.Deserialize&lt;AdminCodeResult&lt;EcsMainView&gt;&gt;(data, options);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    [JsonSerializable(typeof(AdminCodeResult&lt;EcsMainView&gt;))]</span></span>
<span class="line"><span style="color:#A6ACCD;">    public partial class ApiJsonContext: JsonSerializerContext</span></span>
<span class="line"><span style="color:#A6ACCD;">    {</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span></code></pre></div><h2 id="sql-orm" tabindex="-1">SQL ORM <a class="header-anchor" href="#sql-orm" aria-label="Permalink to &quot;SQL ORM&quot;">​</a></h2><ul><li>测试使用FreeSQL,Npgsql需升级到最新版本。</li><li>需要在启动项目中包含rd.xml</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// 项目中包含</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;ItemGroup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;RdXmlFile Include=&quot;rd.xml&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/ItemGroup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;Directives xmlns=&quot;http://schemas.microsoft.com/netfx/2013/01/metadata&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;Application&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;Assembly Name=&quot;XTExternalPage&quot;  Dynamic=&quot;Required All&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;/Assembly&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;Assembly Name=&quot;FreeSql&quot;  Dynamic=&quot;Required All&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;/Assembly&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;Assembly Name=&quot;Npgsql&quot;  Dynamic=&quot;Required All&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;/Assembly&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;/Application&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/Directives&gt;</span></span></code></pre></div><h1 id="avaloniaxt使用步骤" tabindex="-1">AvaloniaXT使用步骤 <a class="header-anchor" href="#avaloniaxt使用步骤" aria-label="Permalink to &quot;AvaloniaXT使用步骤&quot;">​</a></h1><p>安装完 AvaloniaXT Nuget包后</p><h2 id="_1、启动入口-添加-font-awesomon支持-可选" tabindex="-1">1、启动入口 添加 Font Awesomon支持（可选） <a class="header-anchor" href="#_1、启动入口-添加-font-awesomon支持-可选" aria-label="Permalink to &quot;1、启动入口 添加 Font Awesomon支持（可选）&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public static AppBuilder BuildAvaloniaApp()</span></span>
<span class="line"><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">   Register.AddIcons();</span></span>
<span class="line"><span style="color:#A6ACCD;">   return  AppBuilder.Configure&lt;App&gt;()</span></span>
<span class="line"><span style="color:#A6ACCD;">         .UsePlatformDetect()</span></span>
<span class="line"><span style="color:#A6ACCD;">         .WithInterFont()</span></span>
<span class="line"><span style="color:#A6ACCD;">         .LogToTrace();</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> // 页面中使用</span></span>
<span class="line"><span style="color:#A6ACCD;"> &lt;i:Icon Value=&quot;{Binding Condition}&quot; FontSize=&quot;{Binding Width}&quot; /&gt;</span></span></code></pre></div><h2 id="_2、在app-xaml中添加页面选择器、样式、底部托盘-可选" tabindex="-1">2、在App.xaml中添加页面选择器、样式、底部托盘（可选） <a class="header-anchor" href="#_2、在app-xaml中添加页面选择器、样式、底部托盘-可选" aria-label="Permalink to &quot;2、在App.xaml中添加页面选择器、样式、底部托盘（可选）&quot;">​</a></h2><ul><li>页面和弹窗VM都需要继承XTBasePage(提供GetView()方法，注入视图），弹窗还需要重写IsDialog()方法，返回true。</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;Application.DataTemplates&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">     &lt;xt:ViewLocator/&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"> &lt;/Application.DataTemplates&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;Application.Styles&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">			</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;sukiUi:SukiTheme ThemeColor=&quot;Blue&quot;  /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;avalonia:MaterialIconStyles /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    &lt;/Application.Styles&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 项目中包含资源，使用方式</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;ItemGroup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;AvaloniaResource Include=&quot;Assets\\**&quot; /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/ItemGroup&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;TrayIcon.Icons&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;TrayIcons&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;TrayIcon Icon=&quot;/Assets/alarm.ico&quot; Clicked=&quot;NativeMenuItem_Show&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">				  ToolTipText=&quot;AvaloniaXT&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">			&lt;TrayIcon.Menu&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">				&lt;NativeMenu&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">					&lt;NativeMenuItem Header=&quot;Settings&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">						&lt;NativeMenu&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">							&lt;NativeMenuItem Header=&quot;Show&quot; Click=&quot;NativeMenuItem_Show&quot;  /&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">							&lt;NativeMenuItem Header=&quot;Exit&quot; Click=&quot;NativeMenuItem_Click&quot;  /&gt;							</span></span>
<span class="line"><span style="color:#A6ACCD;">						&lt;/NativeMenu&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">					&lt;/NativeMenuItem&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">				&lt;/NativeMenu&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">			&lt;/TrayIcon.Menu&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;/TrayIcon&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;/TrayIcons&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/TrayIcon.Icons&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> private void NativeMenuItem_Click(object? sender, EventArgs e)</span></span>
<span class="line"><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">     if (Application.Current?.ApplicationLifetime is IClassicDesktopStyleApplicationLifetime lifetime)</span></span>
<span class="line"><span style="color:#A6ACCD;">     {</span></span>
<span class="line"><span style="color:#A6ACCD;">         lifetime?.Shutdown();</span></span>
<span class="line"><span style="color:#A6ACCD;">         </span></span>
<span class="line"><span style="color:#A6ACCD;">     }</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> private void NativeMenuItem_Show(object? sender, EventArgs e)</span></span>
<span class="line"><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">     if (Application.Current?.ApplicationLifetime is IClassicDesktopStyleApplicationLifetime lifetime)</span></span>
<span class="line"><span style="color:#A6ACCD;">     {</span></span>
<span class="line"><span style="color:#A6ACCD;">         var window = lifetime?.MainWindow;</span></span>
<span class="line"><span style="color:#A6ACCD;">         window.WindowState = WindowState.Normal;</span></span>
<span class="line"><span style="color:#A6ACCD;">         window.Show();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">     }</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span></code></pre></div><h2 id="_3、在app中注入服务" tabindex="-1">3、在App中注入服务 <a class="header-anchor" href="#_3、在app中注入服务" aria-label="Permalink to &quot;3、在App中注入服务&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">var services = new ServiceCollection();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> // 注入 AvaloniaXT中的服务</span></span>
<span class="line"><span style="color:#A6ACCD;"> services.InitialXTServices();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">// 注入业务界面服务</span></span>
<span class="line"><span style="color:#A6ACCD;">// services.AddSingleton&lt;DbService&gt;();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> _provider = services.BuildServiceProvider();</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  public override void OnFrameworkInitializationCompleted()</span></span>
<span class="line"><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">     // 添加 AvaloniaXT 的方法</span></span>
<span class="line"><span style="color:#A6ACCD;">     ApplicationLifetime?.InitialCompleted(_provider);</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">     base.OnFrameworkInitializationCompleted();</span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span></code></pre></div><h1 id="辅助方法" tabindex="-1">辅助方法 <a class="header-anchor" href="#辅助方法" aria-label="Permalink to &quot;辅助方法&quot;">​</a></h1><h2 id="视图选择器" tabindex="-1">视图选择器 <a class="header-anchor" href="#视图选择器" aria-label="Permalink to &quot;视图选择器&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">public class EcsTagSelector : DataTemplateSelector</span></span>
<span class="line"><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">     public override string GetKey(object? param)</span></span>
<span class="line"><span style="color:#A6ACCD;">     {</span></span>
<span class="line"><span style="color:#A6ACCD;">         var tag = param as UnitTagModel;</span></span>
<span class="line"><span style="color:#A6ACCD;">         return tag.Type.ToString();</span></span>
<span class="line"><span style="color:#A6ACCD;">     }</span></span>
<span class="line"><span style="color:#A6ACCD;">     </span></span>
<span class="line"><span style="color:#A6ACCD;"> }</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;ItemsControl.DataTemplates&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;selector:EcsTagSelector&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;DataTemplate x:Key=&quot;Other&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">			&lt;cp:UnitOther&gt;&lt;/cp:UnitOther&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;/DataTemplate&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;!--&lt;DataTemplate x:Key=&quot;XX&quot;&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">			&lt;cp:UnitXX&gt;&lt;/cp:UnitXX&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">		&lt;/DataTemplate&gt;--&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	&lt;/selector:EcsTagSelector&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">&lt;/ItemsControl.DataTemplates&gt;</span></span></code></pre></div>`,28),o=[p];function i(c,r,A,C,y,D){return a(),n("div",null,o)}const g=s(e,[["render",i]]);export{d as __pageData,g as default};
