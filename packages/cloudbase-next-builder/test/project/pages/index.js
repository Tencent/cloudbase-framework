import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>next-ssr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <img src="/next-ssr/cloudbase.png" alt="Cloudbase Logo" className={styles.clogo} />
        <img src="/next-ssr/nextjs.png" alt="Next.js Logo" className={styles.nlogo} />
        <h1 className={styles.title}>[ CloudBase + Next ] Fullstack APP</h1>
        <h2 className={styles.subtitle}>云开发 CloudBase + Next SSR 全栈应用，包含前端网站 + 云开发函数</h2>
        <div className={styles.links}>
          <a href="https://cloudbase.net/" target="_blank" className={styles['button--green']}>云开发 CloudBase 文档</a>
          <a href="https://github.com/TencentCloudBase/cloudbase-framework" target="_blank" className={styles['button--grey']}>云开发 CloudBase GitHub</a>
          <a href="https://nextjs.org/docs" target="_blank" className={styles['button--green']}>Next.js 文档</a>
          <a href="https://github.com/vercel/next.js" target="_blank" className={styles['button--grey']}>Next.js GitHub</a>
        </div>

        <h2>本示例 Github 源码地址：</h2>
        <a
          className={styles.githubLink}
          href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/next-ssr"
        >https://github.com/TencentCloudBase/cloudbase-templates/tree/master/next-ssr</a>
        <h2>开发部署工具</h2>
        <a
          href="https://github.com/TencentCloudBase/cloudbase-framework"
          title="CloudBase Framework: 云开发前后端一体化部署工具"
        >
          <img width="420" src="https://main.qcloudimg.com/raw/615038b16047fa677646011fae909102.png" />
        </a>
      </div>
    </div>
  )
}
