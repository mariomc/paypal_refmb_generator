function generateLink() {
	var _link = "https://www.paypal.com/cgi-bin/webscr?";
	_link += "&cmd=_xclick";
	_link += "&business=" + $("#_email").val();
	_link += "&currency_code=" + $("#_currency").val();
	_link += "&amount=" + $("#_amount").val().replace(",", ".");
	_link += "&item_name=" + escape($("#_desc").val());
	return _link;
}

function setCurrency() {
	$("#currencySymbol").html($("#_currency option:selected").data("symbol"));
}
function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function showLinks() {
	var _link = generateLink();
	var _html = "";
	var code_link = "<a href=\"" + _link + "\" target=\"_blank\">" + $("#_link").val() + "</a>";
	var code_button = "<a href=\"" + _link + "\" target=\"_blank\"><img src=\"http://www.paypal.com/pt_PT/i/btn/btn_buynow_LG.gif\" border=\"0\" name=\"submit\" alt=\"Make payments with PayPal - it's fast, free and secure!\"></a>";
	_html += "<dl class='dl-horizontal'>";
	_html += "<dt>Link:</dt>"
	_html += "<dd>";
	_html += code_link + "<br/><br/>";
	_html += "<pre class='prettyprint linenums'>" + htmlEntities(code_link) + "</pre>";
	_html += "<hr/>";
	_html += "</dd>";
	_html += "<dt>Button:</dt>"
	_html += "<dd>";
	_html += code_button + "<br/><br/>";
	_html += "<pre class='prettyprint linenums'>" + htmlEntities(code_button) + "</pre>";
	_html += "<hr/>";
	_html += "</dd>";
	_html += "<dt>URL:</dt>"
	_html += "<dd>";
	_html += "html: <pre class='prettyprint linenums'>" + htmlEntities(_link) + "</pre>";
	_html += "</dd>";
	$("#output").html(_html);
}

function GetPaymentRef(entidade, subentidade, id, valor) {
	var _html = "";
	var valor = valor.replace(",",".");
    var ENT_CALC = (51 * parseInt(String(entidade).charAt(0)) +
    73 * parseInt(String(entidade).charAt(1)) +
    17 * parseInt(String(entidade).charAt(2)) +
    89 * parseInt(String(entidade).charAt(3)) +
    38 * parseInt(String(entidade).charAt(4)));
    var iCHECKDIGITS = 0;
    var sTMP = "";
    sTMP = String(Right("000" + subentidade.toString(), 3) + Right("0000" + id.toString(), 4) + Right("00000000" + (parseFloat(valor) * 100).toFixed(0), 8));
	//Calculate check digits
    iCHECKDIGITS =
        98 - (parseInt(ENT_CALC) +
        3 * parseInt(sTMP.charAt(14)) +
        30 * parseInt(sTMP.charAt(13)) +
        9 * parseInt(sTMP.charAt(12)) +
        90 * parseInt(sTMP.charAt(11)) +
        27 * parseInt(sTMP.charAt(10)) +
        76 * parseInt(sTMP.charAt(9)) +
        81 * parseInt(sTMP.charAt(8)) +
        34 * parseInt(sTMP.charAt(7)) +
        49 * parseInt(sTMP.charAt(6)) +
        5 * parseInt(sTMP.charAt(5)) +
        50 * parseInt(sTMP.charAt(4)) +
        15 * parseInt(sTMP.charAt(3)) +
        53 * parseInt(sTMP.charAt(2)) +
        45 * parseInt(sTMP.charAt(1)) +
        62 * parseInt(sTMP.charAt(0))) % 97;

    var _PaymentRef = Right("000" + subentidade, 3) + " " + Mid(Right("0000" + id, 4), 0, 3) + " " + Mid(Right("0000" + id, 4), 3, 1) + Right("00" + iCHECKDIGITS.toString(), 2);
	_html += "<h2>Referência Multibanco</h2><hr/>";
	_html += "<dl class='dl-horizontal'>";
	_html += "<dt>Entidade:</dt>"
	_html += "<dd>";
	_html += entidade + "<br/><br/>";
	_html += "</dd>";
	_html += "<dt>Referência:</dt>"
	_html += "<dd>";
	_html += _PaymentRef + "<br/><br/>";
	_html += "</dd>";
	_html += "<dt>Valor:</dt>"
	_html += "<dd>";
	_html += accounting.formatNumber(valor, 2, "",",") + "<br/><br/>";
	_html += "</dd>";
	$("#output").html(_html);
	
}
//Mid Function
function Mid(value, index, n)
{
    var result = String(value).substring(index, index + n);
    return result;
}
//Right function
function Right(value, n) {
    var result = String(value).substring(String(value).length, String(value).length - n);
    return result;
}
function mb(){
	var _entidade = jQuery("#_entidade").val();
	var _subentidade = jQuery("#_subentidade").val();
	var _id = jQuery("#_id").val();
	var _valor = jQuery("#_valor").val();
	var ret = GetPaymentRef(_entidade,_subentidade,_id, _valor);
}