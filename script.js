$(function () {
    // キャラクターごとのデフォルトデータ
    const defaultData = {
        "person-A": {
            name: "トラ",
            address: "福岡市",
            birth_date: "1973-01-01",
            death_date: "",
            land: "",
            building: "",
            money: ""
        },
        "person-B": {
            name: "ネコ",
            address: "福岡市",
            birth_date: "1973-02-01",
            death_date: "",
            land: "",
            building: "",
            money: ""
        },
        "person-C": {
            name: "カバ",
            address: "東京都",
            birth_date: "2007-01-01",
            death_date: "",
            land: "",
            building: "",
            money: ""
        },
        "person-D": {
            name: "ヒヨコ",
            address: "福岡市",
            birth_date: "2009-01-01",
            death_date: "",
            land: "",
            building: "",
            money: ""
        },
        "person-E": {
            name: "トリ",
            address: "大阪市",
            birth_date: "1973-03-01",
            death_date: "",
            land: "",
            building: "",
            money: ""
        },
        "person-F": {
            name: "サル",
            address: "神戸市",
            birth_date: "2005-01-01",
            death_date: "",
            land: "",
            building: "",
            money: ""
        }
    };

    let selectedCharacterId = null;

    // 円形メニューの表示
    $('.circle').on('click', function (event) {
        event.stopPropagation(); // イベントのバブリングを防ぐ
        const characterPosition = $(this).offset();
        $('#circular-menu').css({
            top: characterPosition.top + $(this).height() / 2 - $('#circular-menu').height() / 2,
            left: characterPosition.left + $(this).width() / 2 - $('#circular-menu').width() / 2
        }).show();
        selectedCharacterId = $(this).attr('id'); // 選択されたキャラクターのIDを保存
    });

    // メニュー外をクリックしたら非表示にする
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.circle, #circular-menu').length) {
            $('#circular-menu').hide();
        }
    });

    // 入力メニューのクリックイベント
    $('#menu-input').on('click', function () {
        $('#circular-menu').hide();
        const characterData = defaultData[selectedCharacterId];
        $('#name').val(characterData.name);
        $('#address').val(characterData.address);
        $('#birth_date').val(characterData.birth_date);
        $('#death_date').val(characterData.death_date);
        $('#land').val(characterData.land);
        $('#building').val(characterData.building);
        $('#money').val(characterData.money);
        $('#input-form').dialog('open');
    });

    // バツボタンをクリックしてフォームを閉じる
    $(document).on('click', '.ui-dialog-titlebar-close', function () {
        $(this).closest('.ui-dialog-content').dialog('close');
    });

    // 詳細メニューのクリックイベント
    $('#menu-details').on('click', function () {
        $('#circular-menu').hide();
        const characterData = defaultData[selectedCharacterId];
        $.ajax({
            url: 'get_details.php',
            method: 'GET',
            data: { name: characterData.name },
            dataType: 'json',
            success: function (data) {
                console.log('Data received:', data); // デバッグ用
                $('#details-id').text(data.id);
                $('#details-name').text(data.name);
                $('#details-address').text(data.address);
                $('#details-birth-date').text(data.birth_date);
                $('#details-death-date').text(data.death_date);
                $('#details-land').text(data.land);
                $('#details-building').text(data.building);
                $('#details-money').text(data.money);
                $('#details').dialog('open');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('詳細情報の取得に失敗しました:', textStatus, errorThrown);
            }
        });
    });

    // フォームの送信イベント
    $('#asset-input-form').on('submit', function (event) {
        event.preventDefault();
        const formData = $(this).serialize();

        // コンソールにデータをログ出力して確認
        console.log("送信データ:", formData);

        // サーバーにデータを送信
        $.ajax({
            url: 'create.php',
            method: 'POST',
            data: formData,
            success: function (response) {
                alert('データが保存されました。');
                $('#input-form').dialog('close');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('データの保存に失敗しました:', textStatus, errorThrown);
            }
        });
    });

    // フォーム外をクリックしたら非表示にする
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.ui-dialog, .circle, #circular-menu').length) {
            $('.ui-dialog-content').dialog('close');
        }
    });

    // 入力フォームのダイアログ設定
    $('#input-form').dialog({
        autoOpen: false,
        modal: true,
        draggable: true,
        resizable: false,
        width: 400,
        title: "入力"
    });

    // 詳細フォームのダイアログ設定
    $('#details').dialog({
        autoOpen: false,
        modal: true,
        draggable: true,
        resizable: false,
        width: 400,
        title: "詳細"
    });

    $('#edit-form').dialog({
        autoOpen: false,
        modal: true,
        draggable: true,
        resizable: false,
        width: 400,
        title: "編集"
    });

    // 編集ボタンのクリックイベント
    $('#update-button').on('click', function () {
        const characterData = {
            id: $('#details-id').text(), // IDを追加,
            name: $('#details-name').text(),
            address: $('#details-address').text(),
            birth_date: $('#details-birth-date').text(),
            death_date: $('#details-death-date').text(),
            land: $('#details-land').text(),
            building: $('#details-building').text(),
            money: $('#details-money').text()
        };

        console.log("characterDataの内容", characterData);

        // 編集フォームを開いてデータをセット
        $('#edit-id').val(characterData.id);
        $('#edit-name').val(characterData.name);
        $('#edit-address').val(characterData.address);
        $('#edit-birth-date').val(characterData.birth_date);
        $('#edit-death-date').val(characterData.death_date);
        $('#edit-land').val(characterData.land);
        $('#edit-building').val(characterData.building);
        $('#edit-money').val(characterData.money);

        // 詳細ダイアログを閉じて編集ダイアログを開く
        $('#details').dialog('close');
        $('#edit-form').dialog('open');
    });

    // 編集フォームの送信イベント
    $('#edit-character-form').on('submit', function (event) {
        event.preventDefault();
        const formData = $(this).serialize();

        // コンソールにデータをログ出力して確認
        console.log("送信データ:", formData);


        // データをサーバーに送信して更新
        $.ajax({
            url: 'update.php',
            method: 'POST',
            data: formData,
            success: function (response) {
                console.log('サーバーレスポンス:', response); 
                alert('データが更新されました。');
                $('#edit-form').dialog('close');
                // location.reload(); // ページをリロードして変更を反映
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('データの更新に失敗しました:', textStatus, errorThrown);
            }
        });
    });

    // 削除ボタンのクリックイベント
    $('#delete-button').on('click', function () {
        const confirmDelete = confirm('本当に削除しますか？');
        if (confirmDelete) {
            $.ajax({
                url: 'delete.php',
                method: 'POST',
                data: { id: $('#details-id').text() }, // データベースのIDを送信
                success: function (response) {
                    alert('データが削除されました。');
                    location.reload(); // ページをリロードして変更を反映
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('データの削除に失敗しました:', textStatus, errorThrown);
                }
            });
        }
    });

});
