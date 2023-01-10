import {request} from "@/utils/request";


export const getrecommondList = (limit)=>request('/personalized',{limit})
//获取歌单的数据
export  const getPlaylist = ()=>request('top/playlist/highquality')
//获取搜索框热搜榜
export const getHot=()=>request('search/hot/detail')
//获取关键字相关歌曲
export const getsuggest=(keywords)=>request('search/suggest',{keywords})
// 获取tags
export const getHotTags = ()=>request('/playlist/hot')
//获取全部歌单
export const getAllTags = ()=>request('/playlist/catlist')
//获取歌单列表
export const getTagsList = (cat, offset)=>request('/top/playlist', {cat,offset})
// 获取排行榜数据
export const getRankList = ()=>request('/toplist')
//获取排行榜歌曲信息
export const getList = (id)=>request('playlist/detail',{id})
//获取歌手信息
export const getSoner = (type, area,initial,offset)=>request('artist/list',{type,area,initial,offset})
//获取收藏者的信息
export const getCollection = (id,offset)=>request('playlist/subscribers',{id,offset})
//获取评论comment/playlist
export const getComment = (id,offset,limit,timestamp)=>request('comment/playlist',{id,offset,limit,timestamp})
//获取用户信息
export const getUserDetail = (uid)=>request('user/detail',{uid})
//获取用户歌单
export const getUserPlaylist = (uid,timestamp)=>request('user/playlist',{uid,timestamp})

