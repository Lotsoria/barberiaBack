const serviceControllers = {
  MyService: {
    MyPort: {
      MyFunction: function(args) {
        console.log(args);
        return {
          result: `Hello, ${args.name}`
        };
      }
    }
  }
}

module.exports = serviceControllers;