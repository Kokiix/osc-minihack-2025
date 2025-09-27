console.log("hello world");
axios.get("https://httpbin.org/get")
  .then(function (response) {
    // handle success
    console.log(response);
  });