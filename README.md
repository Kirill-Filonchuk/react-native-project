# react-native-project

Что сработало для меня, так это следующие шаги:

понижение экспозиции (в моем случае с v48.0.5) до v47 сexpo upgrade 47
удалить все node_modules из проекта и npm installих снова
переустановите Expo Go, сначала удалив его вручную из эмулятора, а затем выполните npm startавтоматическую установку Expo Go.

What worked for me was following these steps:

downgrade expo (in my case from v48.0.5) to v47 with expo upgrade 47
remove all node_modules from the project and npm install them again
reinstall Expo Go by first uninstalling it manually from the emulator, then execute npm start to install Expo Go automatically

How
When launching the camera through ExpoImagePicker we check for device permissions, but on an Android 13 device
the resolution of Manifest.permission.WRITE_EXTERNAL_STORAGE.takeIf { Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU } returns null. While this isn't a problem for apps using the default requestPermissions Activity function, it causes a crash on Expo Go because we have custom logic for permissions using the ScopedPermissionsRequester class.

To resolve this issue, we have two options:

Ensure that all askForPermissions calls always use \*listOfNotNull [android][image-picker] Fix Android 13 permissions #21907)
Update ScopedPermissionsRequester requestPermissions to ignore null values
In my opinion, the section option is more robust and ensures that there is no discrepancy between apps running on Expo Go and dev-client/EAS builds
