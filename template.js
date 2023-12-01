module.exports = {
    HTML: function (name, list, body, control) {
        return `
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>선린 대나무숲</title>
                <style>
                    /* 게시판 스타일 */
                    .board-container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                        font-family: Arial, sans-serif;
                    }

                    .board-title {
                        font-size: 24px;
                        font-weight: bold;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .board-title > a{
                        text-decoration: none;
                        color: black;
                    }

                    .board-list {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }

                    .board-list-item {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px;
                        border-bottom: 1px solid #ccc;
                    }

                    .board-list-item:last-child {
                        border-bottom: none;
                    }

                    .board-list-item-link {
                        color: #000;
                        text-decoration: none;
                    }

                    .board-list-item-title {
                        flex: 1;
                        margin-right: 10px;
                    }

                    .board-list-item-date {
                        font-size: 12px;
                        color: #999;
                    }

                    .board-content {
                        margin-top: 20px;
                        padding: 20px;
                        border: 1px solid #ccc;
                        background-color: #f8f8f8;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        text-align: center;
                    }

                    .board-content-title {
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }

                    .board-content-author {
                        font-size: 14px;
                        color: #999;
                        margin-bottom: 10px;
                    }

                    .board-content-body {
                        font-size: 16px;
                        line-height: 1.5;
                    }

                    /* 기타 스타일 */
                    .board-button {
                        display: inline-block;
                        padding: 8px 16px;
                        font-size: 14px;
                        font-weight: bold;
                        border-radius: 4px;
                        text-decoration: none;
                        background-color: #1e6b7b;
                        color: #fff;
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    .board-button:hover {
                        background-color: #155964;
                    }

                    .board-form input[type="text"],
                    .board-form textarea {
                        width: 100%;
                        padding: 8px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        resize: vertical;
                    }

                    .board-form button[type="submit"] {
                        margin-top: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="board-container">
                    <h1 class="board-title"><a href="/">선린 대나무숲</a></h1>
                    <ul class="board-list">
                        ${list}
                    </ul>
                    <div class="board-control">
                        ${control}
                    </div>
                    <div class="board-content">
                        ${body}
                    </div>
                </div>
            </body>
            </html>
        `;
    },
    list: function (files) {
        let list = '';
        for (i = 0; i < files.length; i++) {
            list += `
                <li class="board-list-item">
                    <a href="/?name=${files[i].id}" class="board-list-item-link">
                        <span class="board-list-item-title">${files[i].title}</span>
                        <span class="board-list-item-date">${files[i].created}</span>
                    </a>
                </li>
            `;
        }
        return list;
    },
    create: function() {
        return `
            <form class="board-form" action="/create_process" method="post">
                <p><input type="text" name="title" placeholder="제목"></p>
                <p><input type="text" name="name" placeholder="이름"></p>
                <p><textarea name="detail" placeholder="내용"></textarea></p>
                <button class="board-button" type="submit">Create</button>
            </form>
        `;
    },
    update: function(id, title, name, detail) {
        return `
            <form class="board-form" action="/update_process" method="post">
                <p><input type="hidden" name="id" value="${id}"></p>
                <p><input type="text" name="title" placeholder="제목" value="${title}"></p>
                <p><input type="text" name="name" placeholder="이름" value="${name}"></p>
                <p><textarea name="detail" placeholder="내용">${detail}</textarea></p>
                <button class="board-button" type="submit">Update</button>
            </form>
        `;
    },
    delete: function(id){
        return`
            <form action="delete_process" method="post">
                <p><input type='hidden' name='id' value='${id}'></p>
                <button class="board-button" type="submit">Delete</button>
            </form>
        `;
    }
}
