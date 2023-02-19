export default function drawOutline(data, resolution, cut) {
    return new Promise((resolve, reject) => {
        const { artworkUrl512, kind } = data;
        const canvas = document.createElement('canvas');
        canvas.width = resolution;
        canvas.height = resolution;
        const ctx = canvas.getContext('2d');
        const appIcon = new Image();
        appIcon.setAttribute('crossOrigin', 'anonymous');
        if (resolution === 512) {
            appIcon.src = artworkUrl512;
        } else {
            appIcon.src = artworkUrl512.replace('512x512', '1024x1024');
        }
        appIcon.onload = function () {
            ctx.drawImage(appIcon, 0, 0);
            ctx.globalCompositeOperation = 'destination-in';
            if (kind.startsWith('software')) {
                if (cut === 'Rounded') {
                    const outline =
                        resolution === 512
                            ? new Path2D('M512,352.563165 C512,358.649887 512,364.736609 511.964307,370.832153 C511.937537,375.957349 511.875074,381.082546 511.732302,386.207742 C511.428911,397.366733 510.759666,408.640401 508.751931,419.675893 C506.717427,430.887811 503.397972,441.323452 498.142168,451.512096 C492.993444,461.515491 486.265301,470.672039 478.234362,478.611241 C470.203422,486.550444 460.932149,493.210553 450.813166,498.300464 C440.515717,503.48741 429.968416,506.777769 418.626946,508.789034 C407.455017,510.773834 396.060006,511.435434 384.763151,511.73536 C363.043922,512 356.886869,512 350.729815,512 L232.004914,512 L161.279108,512 C137.614607,511.929429 132.430189,511.876501 127.245772,511.73536 C115.948917,511.435434 104.553907,510.773834 93.3819778,508.789034 C82.0405068,506.777769 71.4932065,503.48741 61.1957576,498.300464 C51.0678508,493.210553 41.8055008,486.550444 33.7745615,478.611241 C25.7436222,470.672039 19.0154797,461.515491 13.857832,451.512096 C8.6109516,441.323452 5.29149669,430.887811 3.24806879,419.675893 C1.24033396,408.640401 0.580012284,397.366733 0.276621243,386.207742 C0.133848989,381.082546 0.0713861273,375.957349 0.0446163296,370.832153 C-8.0261073e-13,364.736609 0,358.649887 0,352.563165 L0,282.645252 L0,229.354748 L0,159.436835 C0,153.350113 0,147.25457 0.0446163296,141.176669 C0.0713861273,136.042651 0.133848989,130.917454 0.276621243,125.792258 C0.580012284,114.624446 1.24033396,103.359599 3.24806879,92.3152861 C5.29149669,81.1033674 8.6109516,70.6765477 13.857832,60.4879041 C19.0154797,50.4756872 25.7436222,41.31914 33.7745615,33.3887585 C41.8055008,25.4407344 51.0678508,18.7894467 61.1957576,13.6995355 C71.4932065,8.51258969 82.0405068,5.22223119 93.3819778,3.21096647 C104.553907,1.22616577 115.948917,0.564565534 127.245772,0.264640094 C148.965001,0 155.122055,0 161.279108,0 L232.004914,0 L345.679247,0 L279.995086,0.0264640094 L350.729815,0 C374.385393,0.0705706917 379.569811,0.12349871 384.763151,0.264640094 C396.060006,0.564565534 407.455017,1.22616577 418.626946,3.21096647 C429.968416,5.22223119 440.515717,8.51258969 450.813166,13.6995355 C460.932149,18.7894467 470.203422,25.4407344 478.234362,33.3887585 C486.265301,41.31914 492.993444,50.4756872 498.142168,60.4879041 C503.397972,70.6765477 506.717427,81.1033674 508.751931,92.3152861 C510.759666,103.359599 511.428911,114.624446 511.732302,125.792258 C511.875074,130.917454 511.937537,136.042651 511.964307,141.176669 C512,147.25457 512,153.350113 512,159.436835 L512,229.354748 L512,282.645252 L512,352.563165 Z')
                            : new Path2D('M322.558216,0 L691.358493,0 L559.990173,0.0529280188 L701.45963,0 C748.770786,0.141141383 759.139621,0.246997421 769.526303,0.529280188 C792.120012,1.12913107 814.910033,2.45233154 837.253891,6.42193295 C859.936833,10.4444624 881.031434,17.0251794 901.626331,27.3990711 C921.864298,37.5788933 940.406845,50.8814687 956.468724,66.777517 C972.530602,82.63828 985.986887,100.951374 996.284336,120.975808 C1006.79594,141.353095 1013.43485,162.206735 1017.50386,184.630572 C1021.51933,206.719199 1022.85782,229.248892 1023.4646,251.584516 C1023.75015,261.834909 1023.87507,272.085302 1023.92861,282.353338 C1024,294.509139 1024,306.700226 1024,318.87367 L1024,705.12633 C1024,717.299774 1024,729.473218 1023.92861,741.664305 C1023.87507,751.914698 1023.75015,762.165091 1023.4646,772.415484 C1022.85782,794.733465 1021.51933,817.280801 1017.50386,839.351785 C1013.43485,861.775622 1006.79594,882.646905 996.284336,903.024192 C985.986887,923.030983 972.530602,941.344077 956.468724,957.222483 C940.406845,973.100889 921.864298,986.421107 901.626331,996.600929 C881.031434,1006.97482 859.936833,1013.55554 837.253891,1017.57807 C814.910033,1021.54767 792.120012,1022.87087 769.526303,1023.47072 C726.087844,1024 713.773737,1024 701.45963,1024 L322.558216,1024 C275.229214,1023.85886 264.860379,1023.753 254.491544,1023.47072 C231.897835,1022.87087 209.107813,1021.54767 186.763956,1017.57807 C164.081014,1013.55554 142.986413,1006.97482 122.391515,996.600929 C102.135702,986.421107 83.6110016,973.100889 67.5491229,957.222483 C51.4872443,941.344077 38.0309593,923.030983 27.7156639,903.024192 C17.2219032,882.646905 10.5829934,861.775622 6.49613758,839.351785 C2.48066792,817.280801 1.16002457,794.733465 0.553242487,772.415484 C0.267697977,762.165091 0.142772255,751.914698 0.0892326591,741.664305 C-1.60522146e-12,729.473218 0,717.299774 0,705.12633 L0,318.87367 C0,306.700226 0,294.509139 0.0892326591,282.353338 C0.142772255,272.085302 0.267697977,261.834909 0.553242486,251.584516 C1.16002457,229.248892 2.48066792,206.719199 6.49613758,184.630572 C10.5829934,162.206735 17.2219032,141.353095 27.7156639,120.975808 C38.0309593,100.951374 51.4872443,82.63828 67.5491229,66.777517 C83.6110016,50.8814687 102.135702,37.5788933 122.391515,27.3990711 C142.986413,17.0251794 164.081014,10.4444624 186.763956,6.42193295 C209.107813,2.45233154 231.897835,1.12913107 254.491544,0.529280188 C297.930002,0 310.244109,0 322.558216,0 Z');
                    ctx.fill(outline);
                } else {
                    const outline =
                        resolution === 512
                            ? new Path2D('M512, M512')
                            : new Path2D('M1024, M1024');
                    ctx.fill(outline);
                }
            }
            resolve(canvas.toDataURL());
        };
    });
}