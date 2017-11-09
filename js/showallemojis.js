jQuery(document).ready(function($) {
    // Create button.
    var btn = document.createElement( 'button' );
    btn.classList.add( 'Button' );
    // Append button to drop down.
    btn.appendChild( document.createTextNode( gdn.definition( 'ShowAll' ) ) );

    // Create container for button and hidden emojis
    var container = document.createElement( 'div' );
    container.classList.add( 'ShowAllEmojis' );
    container.appendChild( btn );
    emojiContainer = document.createElement( 'span' );
    emojiContainer.classList.add( 'HiddenEmojiContainer', 'Hidden' );

    // Loop throughs remaining emojis and add them to a hidden container.
    var hiddenEmojis = gdn.definition( 'HiddenEmojis' );
    var blueprint = document.createElement( 'span' );
    blueprint.classList.add(
        'editor-action',
        'editor-dialog-fire-close',
        'emoji-wrap'
    );
    blueprint.setAttribute( 'data-wysihtml5-command', 'insertHTML' );

    var emojiInfo = gdn.definition('emoji');
    var editorEmojis = gdn.definition('EditorEmojis');

    var format = emojiInfo.format.replace('{src}', emojiInfo.assetPath + '/{src}');
    
    // Loop through all emojis
    Object.keys(emojiInfo.emoji).forEach(function(key,index) {
        // Ensure emoji is not already displayed.
        if (editorEmojis.indexOf(key) == -1) {
            var emoji = blueprint.cloneNode( false );
            emoji.classList.add( 'emoji-' + key );
            emoji.setAttribute(
                'data-wysihtml5-command-value',
                ' :' + key + ': '
            );
            emoji.setAttribute( 'title', ':' + key + ':' );
            emoji.setAttribute(
                'data-editor',
                '{"action":"emoji","value":":' + key + ':"}'
            );
            // Append emojis file name to assetPath.
            var output = format.replace(/{src}/g, emojiInfo.emoji[key]);
            // Insert emojis :name:
            output = output.replace(/{name}/g, ':' + key + ':');
            emoji.innerHTML = output;
            emojiContainer.appendChild( emoji );
        }
    });
    
    // On click change text and show all emojis
    btn.addEventListener('click', function (evt) {
        // Toggle button text.
        var txt = this.textContent;
        if ( txt == gdn.definition( 'ShowAll' )) {
            this.textContent = gdn.definition( 'ShowLess' );
        } else {
            this.textContent = gdn.definition( 'ShowAll' );
        }
        // Toggle "more" emojis visibility.
        this.parentNode.nextSibling.classList.toggle( 'Hidden' );

        // Don't follow buttons action.
        evt.preventDefault();
        return false;
    });

    // Attach elements to drop down.
    $( '.editor-action-emoji > .editor-insert-dialog' ).append( container ).append( emojiContainer );

    // Attach elements to "edit" boxes. Thanks to James Ducker (@jamesinc)
    // for pointing me in the right direction!
    $( document ).on( "EditCommentFormLoaded", function ( evt, ctx ) {
        ctx.find( ".EditCommentForm" ).find( '.editor-action-emoji > .editor-insert-dialog' ).each( function () {
             $( this ).append( container ).append( emojiContainer );
        });
    });
});
