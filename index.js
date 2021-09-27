$(document).ready(function () {
  var entry = "";
  var chain = "";
  var result = "";
  var nums = [];
  var operators = [];
  var funct = false;
  var equals = false;
  var entryLimit = 8;
  var chainLimit = 22;

  update(entry, chain);

  function update(a, b) {
    if (a !== "") {
      $("#entry").html(a);
      $("#chain").html(b);
    } else {
      $("#entry").html("0");
      $("#chain").html("");
    }
  }

  function checkLimit(type) {
    var max = false;
    if (type == "entry") {
      if (entry.length + 1 > entryLimit || chain.length + 1 > chainLimit) {
        max = true;
      }
    } else {
      if (chain.length + 1 > chainLimit) {
        max = true;
      }
    }

    if (max) {
      funct = "none";
      update("MAX", "");
      entry = "";
      chain = "";
      return false;
    }

    return true;
  }

  $("#AC").click(function () {
    entry = "";
    chain = "";
    nums = [];
    operators = [];
    funct = false;
    equals = false;
    update(entry, chain);
  });

  $("#CE").click(function () {
    entry = "";
    equals = false;
    update("0", chain);
  });

  $(".digit, .digit-wide").click(function () {
    equals = false;
    var val = $(this).html().toString();
    if (funct) {
      if (val == ".") {
        val = "0.";
      }
      entry = val;
      funct = false;
      update(entry, chain);
    } else {
      if (checkLimit("entry")) {
        if (val !== "0" || entry !== "") {
          if (val == ".") {
            if (entry == "") {
              val = "0.";
            } else if (entry.indexOf(".") > -1) {
              return "";
            }
          }
          entry += val;
          update(entry, chain);
        }
      }
    }
  });

  $(".funct").click(function () {
    if (equals) {
      entry = result;
    }

    equals = false;
    var val = $(this).attr("id").toString();
    if (checkLimit("chain") && entry !== "") {
      if (funct) {
        chain = chain.splice(0, chain.length - 1);
        operators[operators.length - 1] = val;
      } else {
        operators.push(val);
        nums.push(Number(entry));
      }
      chain += entry + val;
      funct = true;
      update(entry, chain);
      entry = "";
    }
  });

  $("#equals").click(function () {
    if (operators.length !== 0) {
      equals = true;
      chain += entry;
      nums.push(Number(entry));

      result = nums[0];
      for (var i = 0; i < operators.length; i++) {
        switch (operators[i]) {
          case "+":
            result += nums[i + 1];
            break;
          case "-":
            result -= nums[i + 1];
            break;
          case "x":
            result *= nums[i + 1];
            break;
          case "/":
            result /= nums[i + 1];
            break;
        }
      }
      if (result.toString().length > entryLimit) {
        var decimalPlace = result.toString().indexOf(".");
        if (decimalPlace !== -1 && decimalPlace <= entryLimit) {
          result = result.toFixed(entryLimit - decimalPlace - 1);
          result = result.replace(/0+$/, "");
        } else {
          result = "OVERFLOW";
          chain = "";
          equals = false;
        }
      }
      update(result, chain);
      entry = "";
      chain = "";
      nums = [];
      operators = [];
    }
  });
});
