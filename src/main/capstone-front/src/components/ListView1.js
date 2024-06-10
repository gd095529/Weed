import listView1Css from '../styles/component/ListView1.module.css';

function ListView1() {
    return (
        <div className={listView1Css.body}>
            <div className={listView1Css.imgBox}>
                <img src={'https://marketplace.canva.com/EAF9gve36_w/1/0/1003w/canva-%EB%85%B8%EB%9E%80%EC%83%89-%ED%95%98%EB%8A%98%EC%83%89-%EA%B3%A0%EC%96%91%EC%9D%B4-%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%85%80%EB%9F%AC-%EC%B1%85%ED%91%9C%EC%A7%80-u-BROyrLSjI.jpg'} alt={''} className={listView1Css.bookImg} />
            </div>
            <div className={listView1Css.contentsBox}>
                <div className={listView1Css.titleBox}>
                    <div className={listView1Css.bookname}>제목</div>
                    <div className={listView1Css.author}>저자</div>
                    <div className={listView1Css.publisher}>출판사</div>
                </div>
                <div className={listView1Css.contents}>
                    <div className={listView1Css.description}>내용 주절주절</div>
                </div>
            </div>
        </div>
    )
}

export default ListView1;