/**
 * 로딩 버튼 추가
 */
function startUpload() {
  let elem = document.getElementById('Algopat_progress_anchor_element');
  if (elem !== undefined) {
    elem = document.createElement('span');
    elem.id = 'Algopat_progress_anchor_element';
    elem.className = 'runcode-wrapper__8rXm';
    elem.style = 'margin-left: 10px;padding-top: 0px;';
  }
  elem.innerHTML = `<div id="Algopat_progress_elem" class="Algopat_progress"></div>`;
  const target = document.getElementById('status-table')?.childNodes[1].childNodes[0].childNodes[3] || document.querySelector('div.table-responsive > table > tbody > tr > td:nth-child(5)');
  target.append(elem);
  if (target.childNodes.length > 0) {
    target.childNodes[0].append(elem);
  }
  startUploadCountDown();
}

/**
 * 업로드 완료 아이콘 표시
 */
function markUploadedCSS() {
  uploadState.uploading = false;
  const elem = document.getElementById('Algopat_progress_elem');
  elem.className = 'markuploaded';
  // 1초후 창 닫기
  // setTimeout(() => {
  //   window.close();
  // }, 1000);
}

/**
 * 업로드 실패 아이콘 표시
 */
function markUploadFailedCSS() {
  uploadState.uploading = false;
  const elem = document.getElementById('Algopat_progress_elem');
  elem.className = 'markuploadfailed';
}

/**
 * 총 실행시간이 10초를 초과한다면 실패로 간주합니다.
 */
function startUploadCountDown() {
  uploadState.uploading = true;
  uploadState.countdown = setTimeout(() => {
    if (uploadState.uploading === true) {
      markUploadFailedCSS();
    }
  }, 10000);
}

/**
 * 제출 목록 비교함수입니다
 * @param {object} a - 제출 요소 피연산자 a
 * @param {object} b - 제출 요소 피연산자 b
 * @returns {number} - a와 b 아래의 우선순위로 값을 비교하여 정수값을 반환합니다.
 * 1. 실행시간(runtime)의 차이가 있을 경우 그 차이 값을 반환합니다.
 * 2. 사용메모리(memory)의 차이가 있을 경우 그 차이 값을 반환합니다.
 * 3. 코드길이(codeLength)의 차이가 있을 경우 그 차이 값을 반환합니다.
 * 4. 위의 요소가 모두 같은 경우 제출한 요소(submissionId)의 그 차이 값의 역을 반환합니다.
 * */
function compareSubmission(a, b) {
  // prettier-ignore-start
  /* eslint-disable */
  return a.runtime === b.runtime
    ? a.memory === b.memory
      ? a.codeLength === b.codeLength
        ? -(a.submissionId - b.submissionId)
        : a.codeLength - b.codeLength
      : a.memory - b.memory
    : a.runtime - b.runtime
    ;
  /* eslint-enable */
  // prettier-ignore-end
}

/**
 * 파싱된 문제별로 최고의 성능의 제출 내역을 하나씩 뽑아서 배열로 반환합니다.
 * @param {array} submissions - 제출 목록 배열
 * @returns {array} - 목록 중 문제별로 최고의 성능 제출 내역을 담은 배열
 */
function selectBestSubmissionList(submissions) {
  if (isNull(submissions) || submissions.length === 0) return [];
  return maxValuesGroupBykey(submissions, 'problemId', (a, b) => -compareSubmission(a, b));
}

function convertResultTableHeader(header) {
  switch (header) {
    case '문제번호':
    case '문제':
      return 'problemId';
    case '난이도':
      return 'level';
    case '결과':
      return 'result';
    case '문제내용':
      return 'problemDescription';
    case '언어':
      return 'language';
    case '제출 번호':
      return 'submissionId';
    case '아이디':
      return 'username';
    case '제출시간':
    case '제출한 시간':
      return 'submissionTime';
    case '시간':
      return 'runtime';
    case '메모리':
      return 'memory';
    case '코드 길이':
      return 'codeLength';
    default:
      return 'unknown';
  }
}

function convertImageTagAbsoluteURL(doc = document) {
  if (isNull(doc)) return;
  // img tag replace Relative URL to Absolute URL.
  Array.from(doc.getElementsByTagName('img'), (x) => {
    x.setAttribute('src', x.currentSrc);
    return x;
  });
}
