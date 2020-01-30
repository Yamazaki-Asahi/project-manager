export const state = () => ({
    list: {
      1: {
        slug: 'new',
        name: '未着手',
        color: '#fff'
      },
      2: {
        slug: 'pending',
        name: '保留',
        color: 'rgb(255, 230, 230)'
      },
      3: {
        slug: 'doing',
        name: '作業中',
        color: 'rgb(206, 255, 206)'
      },
      4: {
        slug: 'checking',
        name: '確認中',
        color: 'rgb(221, 229, 238)'
      },
      5: {
        slug: 'done',
        name: '終了',
        color: 'rgb(173, 173, 173)'
      }
    },
  }
)

export const mutations = {

}