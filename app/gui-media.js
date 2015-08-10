const media = function(controller){




  //  controller.store.addSignal('modeChanged',setAppMode);

    //console.log(controller);

    //call this ???
   // WidthChange(window.matchMedia("(min-width: 500px)"));
    // media query event handler
    if (matchMedia) {
        var mq = window.matchMedia("(min-width: 700px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
    }

// media query change
    function WidthChange(mq) {

        if (mq.matches) {
            controller.signals.modeChanged({mode:'desktop'});

        }
        else {
            controller.signals.modeChanged({mode:'mobile'});
        }

    }
};

export default media;
