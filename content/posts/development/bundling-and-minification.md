+++
title = 'Bundling and Minification in ASP.NET Web Pages'
date = 2024-08-15T13:07:57+01:00
tags = ["WebPack", "Bundling", "Minification","Web Optimisation", "Tutorials"]
categories = ["Development Blog"]
+++

_This post was taken from a rough [gist](https://gist.github.com/DaveHogan/ab74b72593c7cdd62ee8ce87c042641f) I created whilst battling bundling and minification back in Nov '23. Things have likely changed since then._

## What is it?
**Bundling and minification are optimisation techniques used to improve the performance of web applications.**

Mainly by reducing the number of HTTP requests and decreasing the overall payload transmitted over the wite. We would typically do this for as many of our site-wide CSS and JavaScript files. 

There's a ton of ways to handle bundling and minification, however many depend on build tools via task runners such as Gulp and Webpack.

MS themselves dropped support for this in ASP.NET Core and recommend such tools task runners. To be clear, this is probably the most mature way to enable bundling and minification in your ASP.NET Web Pages project.

This post isn't covering this but for further reading take a look at the task runner based approach using Webpack, there is the awesome Visual Studio WebPack extension by Mads Kristensen, known as "Webpack Task Runner". This is freely available on the [Visual Studio Market Place](https://marketplace.visualstudio.com/items?itemName=MadsKristensen.WebPackTaskRunner)

## Easier option via Middleware? Try `LigerShark WebOptimizer`  
`LigerShark` is a well established project that is freely available as a NuGet package. It doesn't require you to adopt more complex task runners like `WebPack` or `Glup` and is simple enough to get started. Bring in `LigerShark.WebOptimizer.Core` as a Nuget Package using Visual Studio Package Manager or via command line such as 

```
dotnet add package LigerShark.WebOptimizer.Core 
```

To configure, you're probably best to follow the install guide [from the authors of LingerShark](https://github.com/ligershark/WebOptimizer). This post only serves to just summarise some of the challenges and gotchas I encountered largely due to including assets from an RCL library.

## _viewImports file must contain the WebOptimizer TagHelpers
Include the following tag into `_viewImports.cshtml` file. This enables the cachebuster and resolves references. Sounds obvious but easily missed.

```csharp
@addTagHelper *, WebOptimizer.Core
```

## Middleware configuration
In your `program.cs` or wherever you're defining middleware, if using Response Compression ensure `app.UseResponseCompression()` is called prior to calling `app.UseWebOptimizer()`

## Example middleware pipeline

Example, imagine your site has `a.js`, `b.js`, `site.js` and anything in contentFiles from external RCL libraries. The below will create a virtual `js/mybundle.ls` with the additional files provided as arguments. 

I found that calling `AddJavaScriptBundle` first ensured this worked.

```csharp
builder.Services.AddWebOptimizer(pipeline =>
{
    pipeline.AddJavaScriptBundle("js/mybundle.js", "js/a.js", "js/b.js", "js/site.js", "contentFiles/Core/*.js", "contentFiles/core/js/*.js");
    pipeline.AddCssBundle("/css/mybundle.css", "css/*.css");
});
```

One this is configured you can now replace your individual references to the new bundles version such as:

```HTML
<link rel="stylesheet" href="/css/mybundle.css" />

...

<script src="~/js/mybundle.js"></script>
```


## Copying assets from an external razor class library via a NuGetPackage reference
One gotcha I encountered was when trying to include assets from an RCL library when the files wouldn't be found causing the bundle file to be empty or missing the contents from the assets in the RCL.

The resolution was to ensure the RCL library has a `.nuspec` file with the appropriate `buildAction` and `copyToOutput` set. 

```XML
<?xml version="1.0"?>
<package xmlns="http://schemas.microsoft.com/packaging/2010/07/nuspec.xsd">
  <metadata>
    <id>Core</id>
    <version>1.0.0</version>
    <title>Core</title>
    <authors>Your Name</authors>
    <owners>Your Name</owners>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>A description of your library.</description>
    <releaseNotes>Summary of changes made in this release of the package.</releaseNotes>
    <copyright>Copyright 2022</copyright>
    <tags>Tag1 Tag2</tags>
    <contentFiles>
      <files include="**/js/*.js" buildAction="Content" copyToOutput="true" />
    </contentFiles>
  </metadata>
  <files>
	  <file src="**\js\*.js" target="contentFiles\core\js" />
  </files>
</package>
```
**Files must have their build action tagged as "Content"**

## 404 error from RCL libraries?

When pulling in static asset files such as `.js` or .`css`  from Razor Class Libraries (RCL), if you encounter `404` errors. If you encounter this, review [Github issue #249](https://github.com/ligershark/WebOptimizer/issues/249). Hopefully this will be resolved in `3.0.395+`
