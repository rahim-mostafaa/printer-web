document.addEventListener('DOMContentLoaded', function () {
    // const getParameters = (URL) => {
    //     URL = JSON.parse('{"' + decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    //     return URL;
    // };
    // console.log(getParameters(window.location.href));

    function reformatParam(srt) {
        let newStr = srt.replace(/_-/g, ' ');
        newStr = srt.replace(/-_/g, '\n');
        newStr = srt.replace(/,-/g, '<');
        newStr = srt.replace(/-,/g, '>');
        return newStr;
    }
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    const styles = reformatParam(params.styles);
    const printContents = reformatParam(params.printContents);
    const htmlContent = `
            <html>
              <head>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
              <link rel="stylesheet" href="./font-awesome.min.css">
              </head>
              <style>
              *{
                margin:0 !important;
              }
              ${styles ?? ''}
              </style>
              <body dir='rtl'>${printContents}</body>
              <script type = 'text/javascript'>
                window.onload = function(){
                  window.print();
                  }
                </script>
            </html>`;
    popupWin = window.open('', 'top=0,left=0,height=100%,width=auto')
    popupWin.document.write(htmlContent);


});