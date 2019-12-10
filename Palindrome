function PalindromicOf3(x) {
        var palin = parseInt(
          x
            .toString()
            .split("")
            .reverse()
            .join("")
        );
        if (palin === x) return true;
        else return false;
      }
      var x,
        y,
        result,
        max = 0;

      for (x = 100; x <= 999; x++) {
        for (y = x; y <= 999; y++) {
            result = x * y;
          if (PalindromicOf3(result)) {
            if (max < result) {
              
              max = result;
              console.log(x + "*" + y + "=" + result);
            }
          }
        }
