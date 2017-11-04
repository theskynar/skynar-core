# Skynar/core

Skynar is MVC framework using typescript and based in AngularJS decorators. Make efficient NodeJS scalable application ussing OOP and Dependency Injection.

## Technologies

* Inversify
* Express
* TypeScript

## About core module

Core module have a responsibility for create Modules and control the server instance. Basically, core module configure your application and start them with your module options.

## Dccumentation

Here you can find specification of all exported modules by core module.

### Decorators

* @Module(options: IModuleOptions)

This decorator receive providers (Will to be injected in controllers) and Controllers and resolve container

**Example:**
```typescript
@Module({
  controllers: [MyController],
  providers: [MyService]
})
class MyModule implements ISkynarModule {}
```

* @Server(options: IServerOptions)

This decorator is very important, have responsibility for make express application based in Modules of your aplication resolving all dependency injection.

The server providers is shared, you can access Server providers in all modules of your aplications.

**Example:**
```typescript
@Server({
  modules: [MyModule],
  providers: [MySharedService]
})
class MyServer extends SkynarServer {}
```

### Interfaces

* IModuleOptions

Property | Type | Required
---------|------|----------
providers | Array of services (class) | No
controllers | Array of controllers (class) | No
baseRoute | string | No

* IServerOptions

Property | Type | Description | Default | Required
---------|------|-------------|---------|----------
providers | Array of shared services (class) | You can pass a array of shared providers (all modules can access) | Empty array | No
modules | Array of modules (class) | Array of modules of your aplications | - | Yes
parseBody | boolean | If true, the body of requisitions will be parsed for json | True | No
staticFilesFolder | string | Folder on static files can be loaded | *'/views'* | no

* ISkynarModule

Methods  | Params | Return | Description | Required
---------|--------|--------|-------------|----------
beforeInit | App: Skynar.Application | void | Called before load controllers | No
afterInit | App: Skynar.Application | void | Called after load controlles | No

### Classes

* SkynarServer

Methods  | Params | Return | Description 
---------|--------|--------|-------------
beforeInit | App: Skynar.Application | void | Called before load modules
afterInit | App: Skynar.Application | void | Called after load modules
boot | port: number = 3000, successCallback?: Function | void | Create server and listen in **port**, on success call callback if exists 