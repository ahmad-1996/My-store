
//import '@laylazi/bootstrap-rtl/scss/bootstrap-rtl.scss';
import './scss/style.scss';
import './css/style.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery' ;
import 'popper.js/dist/popper';
import '@fortawesome/fontawesome-free/js/all';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch'

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('.add-to-cart-btn').click(function(){
      alert('أُضيف المنتج إلى عربة الشراء');
    });
    $('.copyright').text("جميع الحقوق محفوظة للمتجر سنة"+new Date().getFullYear());
    
    $('.product-option input[type="radio"]').on("change",function(){
      $(this).parents('.product-option').siblings().removeClass('active');
      $(this).parents('.product-option').addClass('active');

	});
	  $('[data-remove-from-cart]').on("click",function() { 

		$(this).parents('[data-product-info]').remove();

          // أعد حساب السعر الإجمالي بعد حذف أحد المُنتجات
          calculateTotalPrice();
    });

    /* عندما تتغير كمية المنتج */
    $('[data-product-quantity]').on("change",function(){
       /* اجلب الكمية الجديدة */
		var newQuantity = $(this).val();
		/* ابحث عن السطر الذي يحوي معلومات المنتج */
		var $parent = $(this).parents('[data-product-info]')
		/* اجلب سعر القطعة الواحدة من المنتج */
		var pricePerUnit= $parent.attr('data-product-price');
		/* السعر الإجمالي للمنتج وهو ناتج ضرب سعر القطعة بعددها */
		var totalPriceForProduct = newQuantity * pricePerUnit
		/* عين السعر الجديد ضمن خلية السعر الإجمالي للمنتج في هذا السطر  */

		$parent.find('.total-price-for-product').text(totalPriceForProduct+ '$');

		

		/* حدث السعر الإجمالي لكافة المنتجات  */
		calculateTotalPrice();
	});

	function calculateTotalPrice(){
		/* انشىء متغيراً جديداً لحفظ السعر الإجمالي */
		var totalPriceForAllProducts = 0;
		/* لكل سطر يمثل معلومات المنتج في الصفحة */
		$('[data-product-info]').each(function(){
		/* اجلب سعر القطعة الواحدة من الخاصية الموافقة  */
		var pricePerUnit = $(this).attr('data-product-price');
		/* اجلب كمية المنتج من خلال اختيار الكمية */
		var quantity = $(this).find('[data-product-quantity]').val();
		var totalPriceForProduct = pricePerUnit * quantity ;
		/* أضف السعر الإجمالي لهذا المنتج إلى السعر الإجمالي لكل المنتجات زاحفظ القيمة في المتغير نفسه */
		totalPriceForAllProducts = totalPriceForAllProducts + (totalPriceForProduct)
		/* حدث السعر الإجمالي لكل المنتجات في الصفحة */


		});

		$('#total-price-for-all-products').text(totalPriceForAllProducts + '$');
	}

    var citiesByCountry={
		sa:['الرياض','جدة'],
		eg:['القاهرة', 'الإسكندرية'],
		jo:['عمّان', 'الزرقاء'],
		sy:['حلب','دمشق' ,'حماة '],


	};
	/* عندما يتغير البلد */
   $('#form-checkout select[name="country"]').on("change",function(){
    /* اجلب رمز البلد */
    var country=$(this).val();
	/* اجلب مدن هذه المصفوفة  */
	var cities= citiesByCountry[country];
	/* فرّغ قائمة المدن */
   $('#form-checkout select[name="city"]').empty();
   /* إضافة خيار اختر مدينة */
 $('#form-checkout select[name="city"]').append(
   ' <option disabled selected value="">اختر المدينة</option>'
   );
   /* أضف المدن إلى قائمة المدن */
   cities.forEach(function(city){
	   var newOption=$('<option></option>');
	   newOption.text(city);
	   newOption.val(city);
	   $('#form-checkout select[name="city"] ').append(newOption);
   });
       

});
/* عندما تتغير طريقة الدفع */
$('#form-checkout input[name="payment_method"]').change(function(){
/* اجلب القيمة المختارة حالياً */
	var paymentMethod=$(this).val();

	if(paymentMethod ==='on_delivery'){
/* إذا كان الدفع عند الإستلام معطل فعطّل حقول بطاقة الإئتمان  */
    $('credit-card-info input').prop('disabled',true);
 }
  else{
  /* وإلا ففّعلها */
  $('#credit-card-info input').prop('disabled ',false);

  }
  /* بدل معلومات بطاقة الإئتمان بين الظهور والإختفاء */
  $('#credit-card-info').toggle();
      





  

});


/* مكون البحث حسب السعر */

$("#price-range").slider({
	range: true,
    min :50,
    max: 1000,
    step:50,
    values:[250,800],
    slide: function(event,ui){
    $('#price-min').text(ui.values[0]);
    $('#price-max').text(ui.values[1]);
	}

});
});




