<template>
  <div id="editor-md" class="main-editor">
    <textarea style="display: none"></textarea>
  </div>
</template>

<script>
  import $script from 'scriptjs';

  export default {
    props: {
      editorPath: {
        type: String,
        default: 'static/editorMd/',
      },
      editorConfig: {
        type: Object,
        default() {
          return {
            width: '100%',
            height: 400,
            path: 'static/editorMd/lib/',
            codeFold: true,
            saveHTMLToTextarea: true,
            searchReplace: true,
            htmlDecode: 'style,script,iframe|on*',
            emoji: true,
            taskList: true,
            tocm: true,                  // Using [TOCM]
            tex: true,                   // 开启科学公式TeX语言支持，默认关闭
            flowChart: true,             // 开启流程图支持，默认关闭
            sequenceDiagram: true,       // 开启时序/序列图支持，默认关闭,
            imageUpload: true,
            imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
            imageUploadURL: 'static/editorMd/examples/php/upload.php',
            onchange : () => {
              this.$emit("markdownData",this.instance.getMarkdown().trim())
            }
          };
        },
      },
    },
    data() {
      return {
        instance: null
      };
    },

    mounted() {
      $script([
        `${this.editorPath}js/jquery.min.js`,
        `${this.editorPath}js/zepto.min.js`
      ], () => {
        $script(`${this.editorPath}editormd.js`, () => {
          this.initEditor();
        });
      });

    },

    methods: {
      initEditor() {
        // eslint-disable-next-line
        this.$nextTick((editorMD = window.editormd) => {
          if (editorMD) {
            // Vue 异步执行 DOM 更新，template 里面的 script 标签异步创建
            // 所以，只能在 nextTick 里面初始化 editor.md
            this.instance = editorMD('editor-md', this.editorConfig);
          }
        });
      },

    },


  };
</script>

<style lang="scss" scoped>

  .main-editor{
    width :100%;
    height :400px;
  }

</style>
