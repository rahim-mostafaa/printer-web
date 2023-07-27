document.addEventListener('DOMContentLoaded', function () {

    // const getParameters = (URL) => {
    //     URL = JSON.parse('{"' + decodeURI(URL.split("?")[1]).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    //     return URL;
    // };
    // console.log(getParameters(window.location.href));

    try {
        // const params = new Proxy(new URLSearchParams(window.location.search), {
        //     get: (searchParams, prop) => searchParams.get(prop),
        // });
        // firebase login:ci('params.styles : ' + params.styles);
        // alert('params.htmlcontents : ' + params.htmlcontents);
        // alert(`params.styles :  ${params.htmlcontents.split('+-++-+')[1]}`);
        function reformatParam(srt) {
            let newStr = srt.replace(/ā/g, ' ');
            newStr = newStr.replace(/ß/g, `
    `);
            newStr = newStr.replace(/æ/g, '<');
            newStr = newStr.replace(/ñ/g, '>');
            newStr = newStr.replace(/á/g, '+');
            return newStr;
        }
        const ref = location.href.split('?htmlcontents=')[1]
        const params = ref.split('+-++-+');
        const styles = reformatParam(params[1] ? params[1] : '');
        let htmlcontents = params[0] ? params[0] : '';
        htmlcontents = (new URLSearchParams(`?data=${htmlcontents}`)).get('data');
        htmlcontents = reformatParam(htmlcontents);
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
              <body dir='rtl'>${htmlcontents}</body>
              <script type = 'text/javascript'>
                  window.print();
                </script>
            </html>`;
        // let popupWin = window.open('', 'top=0,left=0,height=100%,width=auto')
        document.write(htmlContent);

    } catch (error) {
        alert(`error : ${error}`);
    }


});