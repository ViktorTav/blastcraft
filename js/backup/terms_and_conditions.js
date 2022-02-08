import templateTermsAndConditions from "./templates/terms-and-conditions.js";

const createTermsAndConditions = (event)=>{

    event.preventDefault();

    if ($('div#terms-and-conditions').length){
        $('div#terms-and-conditions').fadeOut(500,function(){$(this.remove())})
    }

    $('body').append(templateTermsAndConditions());

    $('div#terms-and-conditions-window').hide().fadeIn(500);

    $('button#terms-and-conditions-window-close').click(()=>{
        $('div#terms-and-conditions-window').fadeOut(500,function(){$(this.remove())})
    })

}

$('a.terms-and-conditions').click(createTermsAndConditions);
