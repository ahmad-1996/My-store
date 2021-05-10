import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './css/style.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery' ;
import 'popper.js/dist/popper';
import '@fortawesome/fontawesome-free/js/all'

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('.add-to-cart-btn').click(function(){
      alert('أُضيف المنتج إلى عربة الشراء');
    });
  });
