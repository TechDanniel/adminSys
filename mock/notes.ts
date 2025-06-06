import { defineFakeRoute } from 'vite-plugin-fake-server/client'

const notes = {
  items: [
    {
      id: '6598b4c500000000130364cc',
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '大厂的简历啥样 ',
        user: {
          nick_name: '岛主',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30thmlog14s6g5oaf42ggjhjlbgq7aj0',
          user_id: '614f20a1000000000201c675',
          nickname: '岛主'
        },
        interact_info: {
          liked: false,
          liked_count: '69'
        },
        cover: {
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/1612cc0f3b5bafb9356cd99076407748/1040g2sg30tiq9uobks405oaf42ggjhjl895jomg!nc_n_webp_mw_1',
          file_id: '',
          height: 1312,
          width: 1080,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/77483bedfa86f89c1652e5b21f698a86/1040g2sg30tiq9uobks405oaf42ggjhjl895jomg!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/1612cc0f3b5bafb9356cd99076407748/1040g2sg30tiq9uobks405oaf42ggjhjl895jomg!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/77483bedfa86f89c1652e5b21f698a86/1040g2sg30tiq9uobks405oaf42ggjhjl895jomg!nc_n_webp_prv_1'
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      id: '659b6b7c000000001802adab',
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '我才20岁就有了，这正常吗？？？',
        user: {
          nickname: 'Again',
          nick_name: 'Again',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30nopsr5gn0005o60l9b09affqh6uj4g',
          user_id: '60c0aa56000000000100a9ef'
        },
        interact_info: {
          liked: false,
          liked_count: '129'
        },
        cover: {
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/f45e47ef0a0be091b6e75d0b8d22ac15/1040g00830tlf3ko14s005o60l9b09affp1bhr2o!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/c661568214809411cbbb6cd26e930c41/1040g00830tlf3ko14s005o60l9b09affp1bhr2o!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/f45e47ef0a0be091b6e75d0b8d22ac15/1040g00830tlf3ko14s005o60l9b09affp1bhr2o!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/c661568214809411cbbb6cd26e930c41/1040g00830tlf3ko14s005o60l9b09affp1bhr2o!nc_n_webp_mw_1',
          file_id: '',
          height: 2560,
          width: 1833
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      id: '657bf2260000000016004828',
      model_type: 'note',
      note_card: {
        display_title: '我天！这一次直观感受到……',
        user: {
          nick_name: 'Only',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/5ea22b110000000001001d86.jpg',
          user_id: '5ea22b110000000001001d86',
          nickname: 'Only'
        },
        interact_info: {
          liked: false,
          liked_count: '20618'
        },
        cover: {
          file_id: '',
          height: 1707,
          width: 1280,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/555c72d5f3c50ef8ac442765eaeed624/1040g00830smnhlv2js405nl25c8g87c6tn476b8!nc_n_webp_prv_1'
            },
            {
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/444cec837b7089dfa4ea85cdb93502aa/1040g00830smnhlv2js405nl25c8g87c6tn476b8!nc_n_webp_mw_1',
              image_scene: 'WB_DFT'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/555c72d5f3c50ef8ac442765eaeed624/1040g00830smnhlv2js405nl25c8g87c6tn476b8!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/444cec837b7089dfa4ea85cdb93502aa/1040g00830smnhlv2js405nl25c8g87c6tn476b8!nc_n_webp_mw_1'
        },
        type: 'normal'
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      id: '657c11be000000003801eb9a',
      model_type: 'note',
      note_card: {
        cover: {
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/1b5d3e2bf5d3e07d94e08ee4de5a5fc9/1040g2sg30smrcipcjq005o61ssg0bq7b8ljejfg!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/f21e3a5afeb8b55797f1e4e2ea1959fc/1040g2sg30smrcipcjq005o61ssg0bq7b8ljejfg!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/1b5d3e2bf5d3e07d94e08ee4de5a5fc9/1040g2sg30smrcipcjq005o61ssg0bq7b8ljejfg!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/f21e3a5afeb8b55797f1e4e2ea1959fc/1040g2sg30smrcipcjq005o61ssg0bq7b8ljejfg!nc_n_webp_mw_1',
          file_id: '',
          height: 1920,
          width: 1440
        },
        type: 'normal',
        display_title: '从未见过如此歹毒的身材 还有救吗...',
        user: {
          nick_name: '你美儿.',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/60c1e720000000000101e8eb.jpg',
          user_id: '60c1e720000000000101e8eb',
          nickname: '你美儿.'
        },
        interact_info: {
          liked: false,
          liked_count: '21439'
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '健身房遇到这种脏东西该怎么办？',
        user: {
          user_id: '5d294e0a000000001602b371',
          nickname: '苦过金巴利',
          nick_name: '苦过金巴利',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/5f721425f06d5400013b5391.jpg'
        },
        interact_info: {
          liked: false,
          liked_count: '13413'
        },
        cover: {
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/4e50bf4756a0edd4ed7eec28beebb1ff/1040g00830thqq57ikq005n999o55lcrhm2qh9m0!nc_n_webp_mw_1',
          file_id: '',
          height: 2560,
          width: 1920,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/675906a405f1372ef6fca4ae746c5b96/1040g00830thqq57ikq005n999o55lcrhm2qh9m0!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/4e50bf4756a0edd4ed7eec28beebb1ff/1040g00830thqq57ikq005n999o55lcrhm2qh9m0!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/675906a405f1372ef6fca4ae746c5b96/1040g00830thqq57ikq005n999o55lcrhm2qh9m0!nc_n_webp_prv_1'
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false,
      id: '6597b2c6000000001000d8b8'
    },
    {
      ignore: false,
      id: '6588f79800000000160049c4',
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '快来说说你们的社死瞬间！',
        user: {
          nickname: '爱丽丝不是爱丽式',
          nick_name: '爱丽丝不是爱丽式',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30t1cfcu04a6g4bump9ia4ao4gnrc978',
          user_id: '5c00e4a20000000007002b04'
        },
        interact_info: {
          liked_count: '46795',
          liked: false
        },
        cover: {
          height: 2414,
          width: 1080,
          url: '',
          info_list: [
            {
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/6d415c33214ffd9368e17db73d38bdeb/1040g00830t3eeum7426g4bump9ia4ao4b7rpfjg!nc_n_webp_prv_1',
              image_scene: 'WB_PRV'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/35224f8df18aac70c8fcc2ebc6fffc63/1040g00830t3eeum7426g4bump9ia4ao4b7rpfjg!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/6d415c33214ffd9368e17db73d38bdeb/1040g00830t3eeum7426g4bump9ia4ao4b7rpfjg!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/35224f8df18aac70c8fcc2ebc6fffc63/1040g00830t3eeum7426g4bump9ia4ao4b7rpfjg!nc_n_webp_mw_1',
          file_id: ''
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw'
    },
    {
      id: '6593d6e7000000000f032d35',
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '避雷胖东来 都别来了',
        user: {
          nick_name: '玉玉',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/6441e5e8a61cee6d85b08ec8.jpg',
          user_id: '5a484b3ae8ac2b1c85179580',
          nickname: '玉玉'
        },
        interact_info: {
          liked: false,
          liked_count: '422'
        },
        cover: {
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/1663099a9e1c3650b2accc7ea879f61d/1040g00830te277buka004a0j615jl5c069ihj0o!nc_n_webp_mw_1',
          file_id: '',
          height: 2560,
          width: 1920,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/c37370a326375aec4acf6667381f393b/1040g00830te277buka004a0j615jl5c069ihj0o!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/1663099a9e1c3650b2accc7ea879f61d/1040g00830te277buka004a0j615jl5c069ihj0o!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/c37370a326375aec4acf6667381f393b/1040g00830te277buka004a0j615jl5c069ihj0o!nc_n_webp_prv_1'
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      id: '65882507000000003403db0d',
      model_type: 'note',
      note_card: {
        user: {
          user_id: '63563412000000001802c841',
          nickname: 'HankHill壁纸小屋',
          nick_name: 'HankHill壁纸小屋',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30q1n2dmo7k4g5oqm6g965i21farl7g0'
        },
        interact_info: {
          liked_count: '1981',
          liked: false
        },
        cover: {
          file_id: '',
          height: 1706,
          width: 1280,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/dc1ee16760cd48c24234c57394bf0906/spectrum/1040g0k030t2kiicrk6005oqm6g965i21ob0rhio!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/b204beae44975112de7896a96ac220ad/spectrum/1040g0k030t2kiicrk6005oqm6g965i21ob0rhio!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/dc1ee16760cd48c24234c57394bf0906/spectrum/1040g0k030t2kiicrk6005oqm6g965i21ob0rhio!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/b204beae44975112de7896a96ac220ad/spectrum/1040g0k030t2kiicrk6005oqm6g965i21ob0rhio!nc_n_webp_mw_1'
        },
        type: 'normal',
        display_title: '8k极清壁纸 | 高空抛物 |'
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      model_type: 'note',
      note_card: {
        type: 'video',
        display_title: '《我的2023年度总结》',
        user: {
          nick_name: '半口小希',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/608c2099c7594a002dc9f736.jpg',
          user_id: '5a979279e8ac2b02fa0bfb45',
          nickname: '半口小希'
        },
        interact_info: {
          liked: false,
          liked_count: '6934'
        },
        cover: {
          width: 1080,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/66dda1773a32f0b32ff7416fdbf2c77f/1040g00830tbgpfb34a004a2vqk97juq55jia4mo!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/b4526083825e54d951cf71ec8da20c70/1040g00830tbgpfb34a004a2vqk97juq55jia4mo!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/66dda1773a32f0b32ff7416fdbf2c77f/1040g00830tbgpfb34a004a2vqk97juq55jia4mo!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/b4526083825e54d951cf71ec8da20c70/1040g00830tbgpfb34a004a2vqk97juq55jia4mo!nc_n_webp_mw_1',
          file_id: '',
          height: 1440
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false,
      id: '65913bd50000000010010074'
    },
    {
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '沉默不代表退让，你当我是傻子吗？',
        user: {
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30rh5nkkc1o605p9ov4638kghgu42u78',
          user_id: '6538f90c000000000d005211',
          nickname: '周壮师法律服务',
          nick_name: '周壮师法律服务'
        },
        interact_info: {
          liked: false,
          liked_count: '178'
        },
        cover: {
          file_id: '',
          height: 2560,
          width: 1920,
          url: '',
          info_list: [
            {
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/f59a8ca40649b23060fb6eeb156a2b6a/1040g2sg30tnt6fheks6g5p9ov4638kgh4dhbsso!nc_n_webp_prv_1',
              image_scene: 'WB_PRV'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/d846048ea95b70875bcfc50459b42589/1040g2sg30tnt6fheks6g5p9ov4638kgh4dhbsso!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/f59a8ca40649b23060fb6eeb156a2b6a/1040g2sg30tnt6fheks6g5p9ov4638kgh4dhbsso!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/d846048ea95b70875bcfc50459b42589/1040g2sg30tnt6fheks6g5p9ov4638kgh4dhbsso!nc_n_webp_mw_1'
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false,
      id: '659deb30000000000f01dc33'
    },
    {
      note_card: {
        user: {
          nick_name: '陈佩斯',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/64477af44eb377a38141bb57.jpg',
          user_id: '640ff195000000001400e506',
          nickname: '陈佩斯'
        },
        interact_info: {
          liked: false,
          liked_count: '4515'
        },
        cover: {
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/f793ce035cf4ab0377bc144bfe8852a5/1040g2sg30rnnd5sr2i005p0fu6al1p86d1mmb7g!nc_n_webp_prv_1'
            },
            {
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/9fe6e9ad32e8890629ec3026e404a830/1040g2sg30rnnd5sr2i005p0fu6al1p86d1mmb7g!nc_n_webp_mw_1',
              image_scene: 'WB_DFT'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/f793ce035cf4ab0377bc144bfe8852a5/1040g2sg30rnnd5sr2i005p0fu6al1p86d1mmb7g!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/9fe6e9ad32e8890629ec3026e404a830/1040g2sg30rnnd5sr2i005p0fu6al1p86d1mmb7g!nc_n_webp_mw_1',
          file_id: '',
          height: 1440,
          width: 1080,
          url: ''
        },
        type: 'video',
        display_title: '坚持就是胜利！弟兄们，给我顶住！顶住！ #陈佩'
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false,
      id: '655c32bd000000001100f33f',
      model_type: 'note'
    },
    {
      id: '6597e1cf000000000f01e3b8',
      model_type: 'note',
      note_card: {
        interact_info: {
          liked: false,
          liked_count: '100'
        },
        cover: {
          file_id: '',
          height: 1920,
          width: 2560,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/8ebf87c4b646d896d64b043411280158/1040g2sg30ti0hr8j4k6g5n12rss1t7q969pb8t0!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/308e04eae8380bf74af0690687af8e89/1040g2sg30ti0hr8j4k6g5n12rss1t7q969pb8t0!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/8ebf87c4b646d896d64b043411280158/1040g2sg30ti0hr8j4k6g5n12rss1t7q969pb8t0!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/308e04eae8380bf74af0690687af8e89/1040g2sg30ti0hr8j4k6g5n12rss1t7q969pb8t0!nc_n_webp_mw_1'
        },
        type: 'normal',
        display_title: 'Java还是前端？ ',
        user: {
          nick_name: '早睡早起',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/5f428ecbb911850001786288.jpg',
          user_id: '5c22df380000000007029f49',
          nickname: '早睡早起'
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      model_type: 'note',
      note_card: {
        type: 'video',
        display_title: '这是魔法吗？鼻子真的小了一圈！！拯救宽鼻头',
        user: {
          nick_name: '麦片maimai',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/63c6333af49cc7b05d2e2ad4.jpg',
          user_id: '5fbdf7900000000001002913',
          nickname: '麦片maimai'
        },
        interact_info: {
          liked: false,
          liked_count: '10137'
        },
        cover: {
          file_id: '',
          height: 1497,
          width: 1123,
          url: '',
          info_list: [
            {
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/f70576f68c1a1bfd2d5c64236a9fe464/1040g2sg30tn6a1km4m005nttuu808a8jd3find0!nc_n_webp_prv_1',
              image_scene: 'WB_PRV'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/d07689183720dd3f7deccd1c1580bd68/1040g2sg30tn6a1km4m005nttuu808a8jd3find0!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/f70576f68c1a1bfd2d5c64236a9fe464/1040g2sg30tn6a1km4m005nttuu808a8jd3find0!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/d07689183720dd3f7deccd1c1580bd68/1040g2sg30tn6a1km4m005nttuu808a8jd3find0!nc_n_webp_mw_1'
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false,
      id: '659d2fbc000000001d036e52'
    },
    {
      id: '65768ab1000000000703bebf',
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '没想到天秤评分这么高',
        user: {
          nickname: '糖炒小栗子🌰',
          nick_name: '糖炒小栗子🌰',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30pqidfrrn0005nkdpuvg8h9k497helg',
          user_id: '5e8dcfbf0000000001004534'
        },
        interact_info: {
          liked: false,
          liked_count: '5715'
        },
        cover: {
          file_id: '',
          height: 1920,
          width: 887,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/93c604e3c670d65aa7ce5c36b66a2ffc/1040g2sg30sheljh6j6005nkdpuvg8h9k7c1397g!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/31da2313773337e53771c58a154ad5b6/1040g2sg30sheljh6j6005nkdpuvg8h9k7c1397g!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/93c604e3c670d65aa7ce5c36b66a2ffc/1040g2sg30sheljh6j6005nkdpuvg8h9k7c1397g!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/31da2313773337e53771c58a154ad5b6/1040g2sg30sheljh6j6005nkdpuvg8h9k7c1397g!nc_n_webp_mw_1'
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      id: '659663b50000000013034c06',
      model_type: 'note',
      note_card: {
        cover: {
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/ee59bc00993beb551fbc3b5db6c29f0f/1040g2sg30tghtaa44g005pc5cu4n7h8qak4a6ro!nc_n_webp_mw_1',
          file_id: '',
          height: 1706,
          width: 1280,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/744fb45312177056e5ec51611f08f846/1040g2sg30tghtaa44g005pc5cu4n7h8qak4a6ro!nc_n_webp_prv_1'
            },
            {
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/ee59bc00993beb551fbc3b5db6c29f0f/1040g2sg30tghtaa44g005pc5cu4n7h8qak4a6ro!nc_n_webp_mw_1',
              image_scene: 'WB_DFT'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/744fb45312177056e5ec51611f08f846/1040g2sg30tghtaa44g005pc5cu4n7h8qak4a6ro!nc_n_webp_prv_1'
        },
        type: 'normal',
        display_title: '高情商回复｜领导借1w还1千并说麻烦你了？',
        user: {
          nick_name: '星星✨高情商',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/65856902060f7d407c635702.jpg',
          user_id: '65856789000000001c03c51a',
          nickname: '星星✨高情商'
        },
        interact_info: {
          liked: false,
          liked_count: '10916'
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false,
      id: '6597585a0000000011018329',
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '罗翔说:你学不进去，玩不尽兴，睡不踏实，心情不爽，浑身不对劲，却吃得特别多。没有',
        user: {
          user_id: '6295cb38000000001501fa97',
          nickname: '刘嘻嘻努力成长记',
          nick_name: '刘嘻嘻努力成长记',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/64111c3d281f8089224dc17c.jpg'
        },
        interact_info: {
          liked: false,
          liked_count: '61049'
        },
        cover: {
          file_id: '',
          height: 1400,
          width: 1080,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/f66fe4cc166462f82746ee2c69a7059c/1040g2sg30thfov264q605oklpcs5buknepakm50!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/8d08bf0051fffe003a26b10d70f46510/1040g2sg30thfov264q605oklpcs5buknepakm50!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/f66fe4cc166462f82746ee2c69a7059c/1040g2sg30thfov264q605oklpcs5buknepakm50!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/8d08bf0051fffe003a26b10d70f46510/1040g2sg30thfov264q605oklpcs5buknepakm50!nc_n_webp_mw_1'
        }
      }
    },
    {
      ignore: false,
      id: '658f68e40000000011032e94',
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '大学路陈寨花卉不干了，有空的可以去看看',
        user: {
          user_id: '556d11ff62a60c5c79619ad9',
          nickname: 'hedy',
          nick_name: 'hedy',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/556d11ff62a60c5c79619ad9.jpg'
        },
        interact_info: {
          liked_count: '784',
          liked: false
        },
        cover: {
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/7ab097cc73ee996a2bb6de40b09c33ef/1040g00830ta34fimka6040nn3g8vv6mpgcp16b0!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/d5b7e0a1e9f446cef45072b853a8240d/1040g00830ta34fimka6040nn3g8vv6mpgcp16b0!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/7ab097cc73ee996a2bb6de40b09c33ef/1040g00830ta34fimka6040nn3g8vv6mpgcp16b0!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/d5b7e0a1e9f446cef45072b853a8240d/1040g00830ta34fimka6040nn3g8vv6mpgcp16b0!nc_n_webp_mw_1',
          file_id: '',
          height: 2560,
          width: 2263
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw'
    },
    {
      model_type: 'note',
      note_card: {
        user: {
          nickname: '有用的咸鱼',
          nick_name: '有用的咸鱼',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/63e0bc0e50f03d23dab07d89.jpg',
          user_id: '62f1d2500000000015017c55'
        },
        interact_info: {
          liked: false,
          liked_count: '810'
        },
        cover: {
          file_id: '',
          height: 1660,
          width: 1242,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/79b1485ac89e58e957a626f7289e9314/1040g00830thukuk44ke05onhq985av2l0kpidq0!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/2db8fbaeb4d3cdf7af1566ee74860b82/1040g00830thukuk44ke05onhq985av2l0kpidq0!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/79b1485ac89e58e957a626f7289e9314/1040g00830thukuk44ke05onhq985av2l0kpidq0!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/2db8fbaeb4d3cdf7af1566ee74860b82/1040g00830thukuk44ke05onhq985av2l0kpidq0!nc_n_webp_mw_1'
        },
        type: 'normal',
        display_title: '全网最全‼️华为隐藏功能看这一篇就够啦'
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false,
      id: '6597d27200000000110188bd'
    },
    {
      id: '659a54a2000000001102f6fb',
      model_type: 'note',
      note_card: {
        user: {
          nickname: '我不知道应该叫什么',
          nick_name: '我不知道应该叫什么',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30sb53dsn2idg5o60h9p85saca9ahcv8',
          user_id: '60c08a72000000002002f14c'
        },
        interact_info: {
          liked: false,
          liked_count: '5218'
        },
        cover: {
          height: 1698,
          width: 1280,
          url: '',
          info_list: [
            {
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/4333f8aa21be673ad726bf569a8f05e2/1040g2sg30tkd2d374e6g5o60h9p85sacana6f8g!nc_n_webp_prv_1',
              image_scene: 'WB_PRV'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/f5b489fb5482615f457e0847d9d3ae1c/1040g2sg30tkd2d374e6g5o60h9p85sacana6f8g!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/4333f8aa21be673ad726bf569a8f05e2/1040g2sg30tkd2d374e6g5o60h9p85sacana6f8g!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/f5b489fb5482615f457e0847d9d3ae1c/1040g2sg30tkd2d374e6g5o60h9p85sacana6f8g!nc_n_webp_mw_1',
          file_id: ''
        },
        type: 'normal',
        display_title: '这…留学后都会沾染什么恶习啊？'
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      id: '659656d0000000001200345b',
      model_type: 'note',
      note_card: {
        interact_info: {
          liked: false,
          liked_count: '9920'
        },
        cover: {
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/d6b662922c63468edb649c6ad311bbfe/1040g00830tggatru4m005ndan53g8q6fogqhebo!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/e2aa37aa5b52db648447a2e844933f19/1040g00830tggatru4m005ndan53g8q6fogqhebo!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/d6b662922c63468edb649c6ad311bbfe/1040g00830tggatru4m005ndan53g8q6fogqhebo!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/e2aa37aa5b52db648447a2e844933f19/1040g00830tggatru4m005ndan53g8q6fogqhebo!nc_n_webp_mw_1',
          file_id: '',
          height: 2048,
          width: 1536
        },
        type: 'normal',
        display_title: '第一次这么直观感受到！！！',
        user: {
          nick_name: 'Mmmeng',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/610bce2015b15c46ac0bc441.jpg',
          user_id: '5daab94700000000010068cf',
          nickname: 'Mmmeng'
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      id: '659a9505000000001e00740c',
      model_type: 'note',
      note_card: {
        display_title: '心理测试：8秒测出什么对你才是最重要的',
        user: {
          nick_name: '天赋分析师尚恩',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/627cffba374c60e7a5703fa5.jpg',
          user_id: '5f00598b00000000010051e9',
          nickname: '天赋分析师尚恩'
        },
        interact_info: {
          liked: false,
          liked_count: '5935'
        },
        cover: {
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/3adebb6146073841a4e05895b0177575/spectrum/1040g0k030tkkqmhq4q005no0b65g8kf9cbsh9co!nc_n_webp_mw_1',
          file_id: '',
          height: 1707,
          width: 1280,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/09f63674f5cb5a1f3055d042675ddc93/spectrum/1040g0k030tkkqmhq4q005no0b65g8kf9cbsh9co!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/3adebb6146073841a4e05895b0177575/spectrum/1040g0k030tkkqmhq4q005no0b65g8kf9cbsh9co!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/09f63674f5cb5a1f3055d042675ddc93/spectrum/1040g0k030tkkqmhq4q005no0b65g8kf9cbsh9co!nc_n_webp_prv_1'
        },
        type: 'normal'
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false,
      id: '658eafe3000000001303469f',
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '郑州值得去的神仙外企',
        user: {
          nick_name: 'offer先生社招版',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/64534897e0321e000190be5e.jpg',
          user_id: '645346f8000000000f006da8',
          nickname: 'offer先生社招版'
        },
        interact_info: {
          liked: false,
          liked_count: '2749'
        },
        cover: {
          height: 1660,
          width: 1242,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/da489da471da3d07377d730725f0e563/1040g00830t916rbc3q005p2j8rs3ord860tcfm8!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/7570856e1f916437a65bcd8359ff12bb/1040g00830t916rbc3q005p2j8rs3ord860tcfm8!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/da489da471da3d07377d730725f0e563/1040g00830t916rbc3q005p2j8rs3ord860tcfm8!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/7570856e1f916437a65bcd8359ff12bb/1040g00830t916rbc3q005p2j8rs3ord860tcfm8!nc_n_webp_mw_1',
          file_id: ''
        }
      }
    },
    {
      ignore: false,
      id: '658ce308000000001e004c85',
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '一路从战场活着回来的老兵，仅仅是幸运吗',
        user: {
          nick_name: '是典典妈咪呀',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/645b7e4b86578b8c6ab3b056.jpg',
          user_id: '6578037c0000000019011b7b',
          nickname: '是典典妈咪呀'
        },
        interact_info: {
          liked: false,
          liked_count: '772'
        },
        cover: {
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/373dd002f873b431113396ec3726bd6f/1040g00830t78ul6e46005pbo0du6a6rr6bm50qg!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/76c17787ee7016231402ff9758de37db/1040g00830t78ul6e46005pbo0du6a6rr6bm50qg!nc_n_webp_mw_1',
          file_id: '',
          height: 1510,
          width: 1080,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/373dd002f873b431113396ec3726bd6f/1040g00830t78ul6e46005pbo0du6a6rr6bm50qg!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/76c17787ee7016231402ff9758de37db/1040g00830t78ul6e46005pbo0du6a6rr6bm50qg!nc_n_webp_mw_1'
            }
          ]
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw'
    },
    {
      ignore: false,
      id: '658ab5ca000000001d029caf',
      model_type: 'note',
      note_card: {
        user: {
          nick_name: '梨涡小孟',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/5d9f1352936fcd0001383415.jpg',
          user_id: '5cc28851000000001000762b',
          nickname: '梨涡小孟'
        },
        interact_info: {
          liked: false,
          liked_count: '66220'
        },
        cover: {
          file_id: '',
          height: 1440,
          width: 1080,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/fe35fc4ddce9cc576f3dfa322884adab/spectrum/1040g0k030t54tt5j3u005n62h18k0thb5eq1mq8!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/91a10b45750aa27b171108956cd26418/spectrum/1040g0k030t54tt5j3u005n62h18k0thb5eq1mq8!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/fe35fc4ddce9cc576f3dfa322884adab/spectrum/1040g0k030t54tt5j3u005n62h18k0thb5eq1mq8!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/91a10b45750aa27b171108956cd26418/spectrum/1040g0k030t54tt5j3u005n62h18k0thb5eq1mq8!nc_n_webp_mw_1'
        },
        type: 'video',
        display_title: '春节闷声发大财 '
      },
      track_id: '2cp1cm86pbar7jvmeqnlw'
    },
    {
      id: '6586e8f5000000000902467b',
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '这一刻，对周董心情是复杂的',
        user: {
          nick_name: 'Ben不喜欢吃鱼',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/6593e58acd8c473d611b16e4.jpg',
          user_id: '5df4cb2f0000000001001e87',
          nickname: 'Ben不喜欢吃鱼'
        },
        interact_info: {
          liked: false,
          liked_count: '11881'
        },
        cover: {
          width: 1706,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/1d1273238460a157417524b6a6a4e4b5/1040g2sg30t1e5phq4a005nfkpcng87k7bp63ed8!nc_n_webp_prv_1'
            },
            {
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/e4546825fd9963d7de366572d440d6ac/1040g2sg30t1e5phq4a005nfkpcng87k7bp63ed8!nc_n_webp_mw_1',
              image_scene: 'WB_DFT'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/1d1273238460a157417524b6a6a4e4b5/1040g2sg30t1e5phq4a005nfkpcng87k7bp63ed8!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/e4546825fd9963d7de366572d440d6ac/1040g2sg30t1e5phq4a005nfkpcng87k7bp63ed8!nc_n_webp_mw_1',
          file_id: '',
          height: 2560
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      id: '6581502b000000003803379a',
      model_type: 'note',
      note_card: {
        type: 'normal',
        display_title: '年收入对应买车榜，看看什么车最适合你✅',
        user: {
          user_id: '5b28a0a54eacab4c53c7fbf2',
          nickname: '汽车行业观察',
          nick_name: '汽车行业观察',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/6540b787c83a0733f0997431.jpg'
        },
        interact_info: {
          liked: false,
          liked_count: '3575'
        },
        cover: {
          height: 1092,
          width: 822,
          url: '',
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/178dba068cfc5db065c6deb47d468abb/1040g2sg30srv904o40004a6csogabuvibeuep3g!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/f45abd2720d25811cd4e1310a5845ec6/1040g2sg30srv904o40004a6csogabuvibeuep3g!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/178dba068cfc5db065c6deb47d468abb/1040g2sg30srv904o40004a6csogabuvibeuep3g!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/f45abd2720d25811cd4e1310a5845ec6/1040g2sg30srv904o40004a6csogabuvibeuep3g!nc_n_webp_mw_1',
          file_id: ''
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false
    },
    {
      model_type: 'note',
      note_card: {
        cover: {
          info_list: [
            {
              image_scene: 'WB_PRV',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/aafcd943137bcbbcbcfdd2b0eaff547e/1040g00830svth7b3k66g4a90emv53suba9ekns8!nc_n_webp_prv_1'
            },
            {
              image_scene: 'WB_DFT',
              url: 'http://sns-webpic-qc.xhscdn.com/202401101130/4f24b24bd9c320a106ae3933aad59097/1040g00830svth7b3k66g4a90emv53suba9ekns8!nc_n_webp_mw_1'
            }
          ],
          url_pre:
            'http://sns-webpic-qc.xhscdn.com/202401101130/aafcd943137bcbbcbcfdd2b0eaff547e/1040g00830svth7b3k66g4a90emv53suba9ekns8!nc_n_webp_prv_1',
          url_default:
            'http://sns-webpic-qc.xhscdn.com/202401101130/4f24b24bd9c320a106ae3933aad59097/1040g00830svth7b3k66g4a90emv53suba9ekns8!nc_n_webp_mw_1',
          file_id: '',
          height: 2560,
          width: 1920,
          url: ''
        },
        type: 'normal',
        display_title: '不知道哪个业主干的👍',
        user: {
          nick_name: '趴在桌上数羊',
          avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo30pg7vphemi6g4a90emv53sub49iu4a0',
          user_id: '5b64fe5106825b0001f6f3cb',
          nickname: '趴在桌上数羊'
        },
        interact_info: {
          liked: false,
          liked_count: '20264'
        }
      },
      track_id: '2cp1cm86pbar7jvmeqnlw',
      ignore: false,
      id: '65855a79000000000801d6c2'
    }
  ],
  cursor_score: '1.704857399973002E9'
}

export default defineFakeRoute([
  {
    url: '/notes',
    method: 'get',
    response: () => {
      return {
        success: true,
        data: notes
      }
    }
  }
])
