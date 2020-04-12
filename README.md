# Gitter notify - Github action

A [GitHub Action](https://github.com/features/actions) to send a message to a Gitter room.

**Example**

<img width="485" alt="gitter-github-action-example" src="https://user-images.githubusercontent.com/17607423/79047650-97327a00-7c35-11ea-8ebb-5348ea23fbc8.png">


## Usage

You can use this action after any other action. Here is an example setup of this action:

1. Create a `.github/workflows/gitter-notify.yml` file in your GitHub repo.
2. Add the following code to the `gitter-notify.yml` file.

```yml
on: [push]

jobs:
  send_message:
    runs-on: ubuntu-latest
    name: Send test message

    steps:
    - id: initial
      uses: juztcode/gitter-github-action@v1
      with:
        room-id: ${{ secrets.GITTER_ROOM_ID }}
        token: ${{ secrets.GITTER_TOKEN }}
        text: Pending

    - uses: juztcode/gitter-github-action@v1
      with:
        room-id: ${{ secrets.GITTER_ROOM_ID }}
        token: ${{ secrets.GITTER_TOKEN }}
        text: Success
        message-id: ${{ steps.initial.outputs.message-id }}
```

3. Create `GITTER_ROOM_ID` and `GITTER_TOKEN` secrets using [GitHub Action's Secret](https://developer.github.com/actions/creating-workflows/storing-secrets). 
4. You can get Gitter personal access token from [Gitter Developer Page](https://developer.gitter.im/apps).


## Inputs

Input             | Purpose
------------------|---------------------------------------------------------------------------------------------------------------------------------------
room-id           | Specify Gitter room id in which message needs to be sent
token             | Personal access token of a user who has permission to send messages to above mentioned Gitter room.
text              | Message text need to be displayed (Ref, EventName and ActionUrl will be automatically added to the message).
message-id        | Privide message id if you want to replace existing message. Otherwise gitter notify action will return submitted message id and you can access it via step outputs.

>**At the moment Gitter developer api does not provide option to reset personal access token**
