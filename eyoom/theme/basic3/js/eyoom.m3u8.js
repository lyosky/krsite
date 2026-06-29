/**
 * eyoom m3u8 (HLS) 동영상 플레이어 초기화
 * Plyr + HLS.js + P2P Media Loader (HlsJsP2PEngine)
 *
 * test/test1.html 의 VideoPlayerManager 동작을 최소화하여 재현:
 *   - streamId + cdnHosts 만으로 스트림 URL/포스터 생성
 *   - stream URL = https://{randomCdnHost}/{streamId}/playlist.m3u8
 *   - poster     = https://{cdnHost}/{streamId}/thumbnail.jpg
 *   - P2P 지원시 HlsJsP2PEngine.injectMixin(Hls), 미지원시 일반 HLS.js, 그 외 네이티브 HLS(Safari)
 *
 * 본문에 출력된 각 <video class="eyoom-m3u8" data-stream-id data-cdn-hosts> 를 초기화한다.
 */
import { HlsJsP2PEngine } from 'p2p-media-loader-hlsjs';

(function () {
    var videos = document.querySelectorAll('.eyoom-m3u8');
    if (!videos.length) return;

    var Hls = window.Hls;
    // P2P 지원 여부: HLS.js + WebRTC + importmap 모두 갖춰진 경우
    var useP2P = Hls && Hls.isSupported && Hls.isSupported() && typeof window.RTCPeerConnection !== 'undefined';
    var HlsBase = useP2P ? HlsJsP2PEngine.injectMixin(Hls) : Hls;

    function pickRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    videos.forEach(function (v) {
        var streamId = v.getAttribute('data-stream-id');
        var hosts = (v.getAttribute('data-cdn-hosts') || '')
                    .split(',').map(function (s) { return s.trim(); }).filter(Boolean);
        if (!streamId || !hosts.length) return;

        var host = pickRandom(hosts);
        // streamId 로부터 URL/포스터 생성 (video-player.min.js buildStreamUrl 와 동일)
        var src  = 'https://' + host + '/' + streamId + '/playlist.m3u8';
        v.poster = 'https://' + host + '/' + streamId + '/thumbnail.jpg';

        if (Hls && Hls.isSupported && Hls.isSupported()) {
            var hls = new HlsBase();
            hls.loadSource(src);
            hls.attachMedia(v);
        } else if (v.canPlayType('application/vnd.apple.mpegurl')) {
            v.src = src;   // 네이티브 HLS (Safari)
        }
        if (window.Plyr) new Plyr(v);

        // 본문 전체가 <a href="..."> 로 감싸져 있어 영상 클릭 시 상위 <a> 가
        // 활성화되어 페이지가 이동(새로고침)하는 현상 방지.
        // preventDefault() 로 <a> 의 기본 동작(이동)을 취소하고,
        // stopPropagation() 로 클릭이 <a>/document 까지 버블링하지 않게 한다.
        // (Plyr 컨트롤은 JS 핸들러로 동작하므로 정상 작동한다)
        var guardTarget = v.closest('.eyoom-m3u8-wrap') || v.parentNode;
        if (guardTarget) {
            guardTarget.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
            }, false);
        }
    });
})();
