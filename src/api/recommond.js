import {request} from "@/utils/request";


export const getrecommondList = (limit)=>request('/personalized',{limit})
//获取歌单的数据
export  const getPlaylist = ()=>request('top/playlist/highquality')
// 获取tags
export const getHotTags = ()=>request('/playlist/hot')
//获取全部歌单
export const getAllTags = ()=>request('/playlist/catlist')
//获取歌单列表
export const getTagsList = (cat, offset)=>request('/top/playlist', {cat,offset})
