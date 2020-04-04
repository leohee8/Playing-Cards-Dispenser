$(function(){
    let person=$("#number-of-person")

    function personValidate(){
        if(person.val().length===0||person.val()<0){
            msg=$("#error").length===0?'<div class="invalid-feedback" id="error">Value is invalid</div>':null
            person
                .addClass("is-invalid")
                .parent().append(msg)
            return false
        }
        person.removeClass("is-invalid")
        $("#error").remove()
        return true
    }
    
    function dispatch(){
        if(personValidate()){
            $.getJSON("cards-dispenser.php?person="+person.val(),function(data){
                let items=[]
                $.each(data,function(key,value){items.push(value)})
                str=""
                for(let i in items){
                    list='<ul>'
                    for(let l in items[i]){list+='<li>'+items[i][l]+'</li>'}
                    list+='</ul>'
                    str+='<div class="slot">'+list+'</div>'
                }
                $("#result").html(str)
            })
        }
    }

    $("#distribute").on("click",function(){dispatch()})
    person.on("keypress",function(e){
        let key=e.which||e.keyCode
        if(key===13){dispatch()}
    })
})